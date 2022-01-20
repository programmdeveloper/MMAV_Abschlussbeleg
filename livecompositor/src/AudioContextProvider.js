class AudioContextProvider {
    constructor() {
        if (!AudioContextProvider._instance) {
            this.audioContext = new AudioContext();
            AudioContextProvider._instance = this;
        }
        return AudioContextProvider._instance;
    }

    getAudioContext() {
        return this.audioContext;
    }
}

const instance = new AudioContextProvider();
Object.freeze(instance);

export default instance;