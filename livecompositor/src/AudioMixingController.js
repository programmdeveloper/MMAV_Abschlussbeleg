import audioContextProvider from "./AudioContextProvider";

class AudioMixingController {
    constructor() {
        if (!AudioMixingController._instance) {
            this.audioCtx = audioContextProvider.getAudioContext();
            this.out = this.audioCtx.destination;

            this.externalAudio = new Audio("Music/Land_of_8_Bits.wav");
            //Audio Node for external Audio
            this.externalAudioSource = this.audioCtx.createMediaElementSource(this.externalAudio);

            this.gainNode = this.audioCtx.createGain();


            this.externalAudioSource.connect(this.gainNode);
            this.gainNode.connect(this.out);

            //Audio Node from Node editor
            this.nodeEditorAudioSource = null;


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

    adaptVolume(value) {
        this.gainNode.gain.value = value;
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

    setNodeAudioSource(audioNode) {
        try {
            this.nodeEditorAudioSource.disconnect(this.out);
        } catch {
            ;
        }

        this.nodeEditorAudioSource = audioNode;
        if(this.nodeEditorAudioSource !== null) {
            this.nodeEditorAudioSource.connect(this.out);
        }
    }
}

const instance = new AudioMixingController();
//Object.freeze(instance);

export default instance;
