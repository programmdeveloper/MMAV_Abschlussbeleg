/**
 * Class for handling output nodes (Singleton)
 */
class OutputRegistry {
    constructor() {
        if (!OutputRegistry._instance) {
            this.currentVideoOut = null;
            this.currentAudioOut = null;
            this.outputs = []
            OutputRegistry._instance = this;
        }
        return OutputRegistry._instance;
    }

    /**
     * register output node to active-observer
     */
    addOutputNode(outputNode) {
        this.outputs.push(outputNode);
    }

    /**
     * unregister output node from active-observer
     * @param {*} outputNode 
     */
    removeOutputNode(outputNode) {
        for(let i=0; i< this.outputs.length;i++) {
            if(this.outputs[i].getId() === outputNode.getId()) {
                this.outputs.splice(i,1);
                break;
            }
        }
    }

    /**
     * Called, when the active state changed on output nodes
     */
    triggerActiveUpdateOnOutputs() {
        for(let i = 0; i<this.outputs.length;i++) {
            this.outputs[i].updateActiveState();
        }
    }

    /**
     * Set currently active audio output node
     * @param {*} outputNode audio output node to set active
     */
    setCurrentAudioOut(outputNode) {
        this.currentAudioOut = outputNode
        this.triggerActiveUpdateOnOutputs()
    }

    /**
     * 
     * @returns currently active audio output node
     */
    getCurrentAudioOut() {
        return this.currentAudioOut
    }

    /**
     * Set currently active video output node
     * @param {*} outputNode video output node to set active
     */
    setCurrentVideoOut(outputNode) {
        this.currentVideoOut = outputNode
        this.triggerActiveUpdateOnOutputs()
    }

    /**
     * 
     * @returns currently active video output node
     */
    getCurrentVideoOut() {
        return this.currentVideoOut
    }
}

const instance = new OutputRegistry();
//Object.freeze(instance);

export default instance;