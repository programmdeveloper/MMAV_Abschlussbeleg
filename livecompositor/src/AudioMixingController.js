import audioContextProvider from "./AudioContextProvider";

class AudioMixingController {
    constructor() {
        if (!AudioMixingController._instance) {
            this.audioCtx = audioContextProvider.getAudioContext();
            this.out = this.audioCtx.destination;
            this.streamOut = this.audioCtx.createMediaStreamDestination();

            this.externalAudio = undefined;
            //Audio Node for external Audio
            this.externalAudioSource = undefined;

            this.gainNodeExternal = this.audioCtx.createGain();


            //this.externalAudioSource.connect(this.gainNodeExternal);
            this.gainNodeExternal.connect(this.out);
            this.gainNodeExternal.connect(this.streamOut);

            //Audio Node from Node editor
            this.nodeEditorAudioSource = null;
            this.gainNode = this.audioCtx.createGain();
            this.gainNode.connect(this.out);
            this.gainNode.connect(this.streamOut);

            AudioMixingController._instance = this;
        }
        return AudioMixingController._instance;
    }

    getStreamOut() {
        return this.streamOut;
    }

    uploadAudio(file) {
        this.clearExternalAudio();
        this.externalAudio = new Audio(URL.createObjectURL(file));
        this.externalAudioSource = this.audioCtx.createMediaElementSource(this.externalAudio);
        this.externalAudioSource.connect(this.gainNodeExternal);
    }

    clearExternalAudio() {
        try {
            this.externalAudioSource.disconnect(this.gainNodeExternal);
        } catch {
            ;
        }
        this.externalAudio = undefined;
        this.externalAudioSource = undefined;
    }

    playExternal() {
        if(this.externalAudio != undefined && this.externalAudioSource != undefined) {
            this.externalAudio.play();
        } else {
            alert("Upload audiofile first!");
        }
    }

    pauseExternal() {
        if (this.externalAudio != undefined && this.externalAudioSource != undefined) {
            this.externalAudio.pause();
        }
    }

    adaptExternalVolume(value) {
        this.gainNodeExternal.gain.value = value;
    }

    adaptSpeed(value) {
        this.externalAudio.playbackRate = value;
        document.getElementById('speed').value = value;
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

    muteExternal(value) {
        if (document.getElementById('muteExternal').checked === false) {
            this.gainNodeExternal.gain.value = value;
        } else {
            this.gainNodeExternal.gain.value = 0;
        }
    }

    muteNode(value) {
        if(this.nodeEditorAudioSource !== null) {
            if (document.getElementById('muteNode').checked === false) {
                this.gainNode.gain.value = value;
            } else {
                this.gainNode.gain.value = 0;
            }
        }
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
