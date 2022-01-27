/**
 * Class for handling audio context globally (Singleton)
 */
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

    /**
     * Get the main audio context.
     * @returns audio context
     */
    getAudioContext() {
        return this.audioContext;
    }

    /**
     * resume audio context, if paused (default policy on Chrome and Safari)
     */
    resumeAudioContext() {
        if(this.audioContext.state == "suspended") {
            this.audioContext.resume();
        }
    }

}

const instance = new AudioContextProvider();
Object.freeze(instance);

export default instance;