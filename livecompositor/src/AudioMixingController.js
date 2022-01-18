import audioContextProvider from "./AudioContextProvider";

class AudioMixingController {
    constructor() {
        if (!AudioMixingController._instance) {
            this.audioCtx = audioContextProvider.getAudioContext();
            this.out = this.audioCtx.destination;

            this.externalAudio = new Audio("Music/Land_of_8_Bits.wav");
            //Audio Node for external Audio
            this.externalAudioSource = this.audioCtx.createMediaElementSource(this.externalAudio);

            this.gainNodeExternal = this.audioCtx.createGain();


            this.externalAudioSource.connect(this.gainNodeExternal);
            this.gainNodeExternal.connect(this.out);

            //Audio Node from Node editor
            this.nodeEditorAudioSource = null;
            this.gainNode = this.audioCtx.createGain();
            this.gainNode.connect(this.out);

            AudioMixingController._instance = this;
        }
        return AudioMixingController._instance;
    }

    playExternal() {
        this.externalAudio.play();
        document.getElementById('externalAudio').checked = true;
    }

    pauseExternal() {
        this.externalAudio.pause();
        document.getElementById('externalAudio').checked = false;
    }

    adaptExternalVolume(value) {
        this.gainNodeExternal.gain.value = value;
    }

    adaptSpeed(value) {
        this.externalAudio.playbackRate = value;
        document.getElementById('speed').value = value;
    }

    externalActive() {
        if (document.getElementById('externalAudio').checked === false) {
            this.pauseExternal();
        } else {
            this.playExternal();
        }
    }

    adaptNodeVolume(value) {
        if(this.nodeEditorAudioSource !== null) {
            this.gainNode.gain.value = value;
        }
    }

    adaptAllVolume(value) {
        if(this.nodeEditorAudioSource !== null) {
            this.gainNode.gain.value = value;
        }
        this.gainNodeExternal.gain.value = value;
    }

    setNodeAudioSource(audioNode) {
        try {
            this.nodeEditorAudioSource.disconnect(this.gainNode);
        } catch {
            ;
        }

        this.nodeEditorAudioSource = audioNode;
        if(this.nodeEditorAudioSource !== null) {
            this.nodeEditorAudioSource.connect(this.gainNode);
        }
    }
}

const instance = new AudioMixingController();
//Object.freeze(instance);

export default instance;
