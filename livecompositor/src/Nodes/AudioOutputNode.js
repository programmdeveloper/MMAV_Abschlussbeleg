import { faPassport } from "@fortawesome/free-solid-svg-icons";
import audioContextProvider from "../AudioContextProvider";
import { v4 as uuidv4 } from 'uuid';
import outRegistry from '../OutputRegistry';
import audioMixingInstance from '../AudioMixingController';

export function AudioOutputNode() {
    this.addInput("AudioOut", "audioElement");

    this.audioCtx = audioContextProvider.getAudioContext();
    this.inputAudioNode = null;

    this.id = uuidv4();

    this.active = this.addWidget("toggle", "Active", false, this.activeToggled.bind(this));
}

AudioOutputNode.prototype.getId = function () {
    return this.id;
}

AudioOutputNode.title = "Audio Output";

AudioOutputNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
    if (this.flags.collapsed)
        return;
    ctx.save();
    ctx.fillStyle = "#4d004d";
    ctx.fillRect(0, 0, this.size[0], this.size[1]);

    //Border
    const BORDERSTRENGTH = 4
    if (this.active.value) {
        ctx.beginPath();
        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = BORDERSTRENGTH;
        ctx.rect(0 + BORDERSTRENGTH / 2, 0 + BORDERSTRENGTH / 2, this.size[0] - BORDERSTRENGTH, this.size[1] - BORDERSTRENGTH);
        ctx.stroke();
    }
    ctx.restore();
}

AudioOutputNode.prototype.onAdded = function () {
    outRegistry.addOutputNode(this);
}

AudioOutputNode.prototype.onRemoved = function () {
    outRegistry.removeOutputNode(this);
}

AudioOutputNode.prototype.activeToggled = function () {
    if (this.active.value === true) {
        outRegistry.setCurrentAudioOut(this);
        audioMixingInstance.setNodeAudioSource(this.inputAudioNode);
    } else {
        outRegistry.setCurrentAudioOut(null);
        audioMixingInstance.setNodeAudioSource(null);
    }
}

AudioOutputNode.prototype.updateActiveState = function () {
    try {
        var isActive = this.id === outRegistry.getCurrentAudioOut().getId()
        if (this.active.value !== isActive) {
            this.active.value = isActive
        }
    } catch {
        this.active.value = false;
    }
}

AudioOutputNode.prototype.onExecute = function () {

    if (!this.getInputData(0) || this.active.value == false) {
        try {
            this.inputAudioNode = null;
        } catch {
            ;
        }

        return;
    };

    var inputAudioNode = this.getInputData(0);
    if(this.inputAudioNode != inputAudioNode)
        this.inputAudioNode = inputAudioNode
}