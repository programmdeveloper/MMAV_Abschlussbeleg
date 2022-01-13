import audioContextProvider from "../AudioContextProvider";

export function AudioMixerNode() {
    this.addInput("Audio A", "audioElement");
    this.addInput("Audio B", "audioElement");
    this.addOutput("Audio Out", "audioElement");

    this.audioCtx = audioContextProvider.getAudioContext();
    this.merger = this.audioCtx.createChannelMerger(2);
    this.splitter = this.audioCtx.createChannelSplitter(2);
    this.gainNodeA = this.audioCtx.createGain();
    this.gainNodeB = this.audioCtx.createGain();
    this.inputAudioNodeA = null;
    this.inputAudioNodeB = null;

    var channel1 = [0, 1];
    var channel2 = [1, 0];
    this.gainNodeA.connect(this.splitter);
    this.splitter.connect(this.merger, channel1[0], channel1[1]);
    this.gainNodeB.connect(this.splitter);
    this.splitter.connect(this.merger, channel2[0], channel2[1]);

}

AudioMixerNode.title = "Audio Merge";

AudioMixerNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
    if (this.flags.collapsed)
        return;
    ctx.save();
    ctx.fillStyle = "#b30000";
    ctx.fillRect(0, 0, this.size[0], this.size[1]);
    ctx.restore();
}

AudioMixerNode.prototype.onExecute = function () {

    if(!this.getInputData(0)) {
        if (this.inputAudioNodeA != null) {
            this.inputAudioNodeA.disconnect(this.gainNodeA);
            this.inputAudioNodeA = null;
        }
    } else {
        if(this.getInputData(0) != this.inputAudioNodeA) {
            try {
                this.inputAudioNodeA.disconnect(this.gainNodeA);
            } catch {;}

            this.inputAudioNodeA = this.getInputData(0);
            this.inputAudioNodeA.connect(this.gainNodeA);
        }
    }

    if (!this.getInputData(1)) {
        if (this.inputAudioNodeB != null) {
            this.inputAudioNodeB.disconnect(this.gainNodeB);
            this.inputAudioNodeB = null;
        }
    } else {
        if (this.getInputData(1) != this.inputAudioNodeB) {
            try {
                this.inputAudioNodeB.disconnect(this.gainNodeB);
            } catch { ; }

            this.inputAudioNodeB = this.getInputData(1);
            this.inputAudioNodeB.connect(this.gainNodeB);
        }
    }

    this.setOutputData(0, this.merger);
}