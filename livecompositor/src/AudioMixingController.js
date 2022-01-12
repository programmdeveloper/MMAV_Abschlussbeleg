import audioContextProvider from "./AudioContextProvider";

class AudioMixingController {
    constructor() {
        if (!AudioMixingController._instance) {
            this.audioCtx = audioContextProvider.getAudioContext();
            this.out = this.audioCtx.destination;

            this.externalAudio = new Audio("Music/ShootToThrill.mp3");
            //Audio Node for external Audio
            this.externalAudioSource = this.audioCtx.createMediaElementSource(this.externalAudio);

            //Audio Node from Node editor
            this.nodeEditorAudioSource = null;


            AudioMixingController._instance = this;
        }
        return AudioMixingController._instance;
    }

    playExternal() {
        this.externalAudio.play();
    }

    pauseExternal() {
        this.externalAudio.pause();
    }

    adaptVolume(value) {
        console.log(value);
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