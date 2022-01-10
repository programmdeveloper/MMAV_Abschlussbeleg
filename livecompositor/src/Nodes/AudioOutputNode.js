import { faPassport } from "@fortawesome/free-solid-svg-icons";
import audioContextProvider from "../AudioContextProvider";

export function AudioOutputNode() {
    this.addInput("AudioOut", "audioElement");

    this.audioCtx = audioContextProvider.getAudioContext();
    this.inputAudioNode = null;
}

AudioOutputNode.title = "Audio Output";

AudioOutputNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
    if (this.flags.collapsed)
        return;
    ctx.save();
    ctx.fillStyle = "#ffcc00";
    ctx.fillRect(0, 0, this.size[0], this.size[1]);
    ctx.restore();
}


AudioOutputNode.prototype.onExecute = function () {
    if (!this.getInputData(0)) {
        try {
            this.inputAudioNode.disconnect(this.audioCtx.destination);
            this.inputAudioNode = null;
        } catch {
            ;
        }

        return;
    };

    var inputAudioNode = this.getInputData(0);
    if(this.inputAudioNode != inputAudioNode)
        inputAudioNode.connect(this.audioCtx.destination);
        this.inputAudioNode = inputAudioNode
}