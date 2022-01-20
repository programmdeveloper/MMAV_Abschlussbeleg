class AudioContextProvider {
    constructor() {
        if (!AudioContextProvider._instance) {
            this.audioContext = new AudioContext();
            AudioContextProvider._instance = this;
        }

        if (this.audioContext.state == "suspended") {
            window.onmousedown = this.resumeAudioContext.bind(this)
            window.onmousemove = this.resumeAudioContext.bind(this)
        }

        return AudioContextProvider._instance;
    }

    getAudioContext() {
        return this.audioContext;
    }

    resumeAudioContext() {
        if(this.audioContext.state == "suspended") {
            this.audioContext.resume();
        }
    }

}

const instance = new AudioContextProvider();
Object.freeze(instance);

export default instance;