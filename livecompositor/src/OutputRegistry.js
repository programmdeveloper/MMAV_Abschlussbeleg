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

    addOutputNode(outputNode) {
        this.outputs.push(outputNode);
    }

    removeOutputNode(outputNode) {
        for(let i=0; i< this.outputs.length;i++) {
            if(this.outputs[i].getId() === outputNode.getId()) {
                this.outputs.splice(i,1);
                break;
            }
        }
    }

    triggerActiveUpdateOnOutputs() {
        for(let i = 0; i<this.outputs.length;i++) {
            this.outputs[i].updateActiveState();
        }
    }

    setCurrentAudioOut(outputNode) {
        this.currentAudioOut = outputNode
        this.triggerActiveUpdateOnOutputs()
    }

    getCurrentAudioOut() {
        return this.currentAudioOut
    }

    setCurrentVideoOut(outputNode) {
        this.currentVideoOut = outputNode
        this.triggerActiveUpdateOnOutputs()
    }

    getCurrentVideoOut() {
        return this.currentVideoOut
    }
}

const instance = new OutputRegistry();
//Object.freeze(instance);

export default instance;