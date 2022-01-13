//IMPORT NODES
import { OutputNode } from "./Nodes/OutputNode";
import { RandomNoiseNode } from "./Nodes/RandomNoise";
import { ImageInputNode } from "./Nodes/ImageInputNode";
import { WebcamInputNode } from "./Nodes/WebcamInputNode";
import { MergeNode } from "./Nodes/MergeNode";
import { AudioOutputNode } from "./Nodes/AudioOutputNode";
import { AudioMixerNode } from "./Nodes/AudioMixerNode";

export default class NodeRegister {
    constructor() {
        this.LiteGraph = require("litegraph.js/build/litegraph.js").LiteGraph;
    }

    register() {
        this.LiteGraph.clearRegisteredTypes();
        //PUT NODES HERE TO REGISTER THEM AUTOMATICALLY
        this.LiteGraph.registerNodeType("output/OutputNode", OutputNode);
        this.LiteGraph.registerNodeType("output/AudioOutputNode", AudioOutputNode);
        this.LiteGraph.registerNodeType("noise/RandomNoise", RandomNoiseNode);
        this.LiteGraph.registerNodeType("input/ImageInput", ImageInputNode);
        this.LiteGraph.registerNodeType("input/WebcamInput", WebcamInputNode);
        this.LiteGraph.registerNodeType("merge/Merge", MergeNode);
        this.LiteGraph.registerNodeType("merge/AudioMerge", AudioMixerNode);
    }

    getLiteGraph() {
        return this.LiteGraph;
    }
}