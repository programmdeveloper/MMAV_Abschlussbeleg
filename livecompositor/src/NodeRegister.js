//IMPORT NODES
import { OutputNode } from "./Nodes/OutputNode";
import { RandomNoiseNode } from "./Nodes/RandomNoise";
import { ImageInputNode } from "./Nodes/ImageInputNode";

export default class NodeRegister {
    constructor() {
        this.LiteGraph = require("litegraph.js/build/litegraph.js").LiteGraph;
    }

    register() {
        this.LiteGraph.clearRegisteredTypes();
        //PUT NODES HERE TO REGISTER THEM AUTOMATICALLY
        this.LiteGraph.registerNodeType("output/OutputNode", OutputNode);
        this.LiteGraph.registerNodeType("noise/RandomNoise", RandomNoiseNode);
        this.LiteGraph.registerNodeType("input/ImageInput", ImageInputNode);
    }

    getLiteGraph() {
        return this.LiteGraph;
    }
}