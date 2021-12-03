//IMPORT NODES
import { OutputNode } from "./Nodes/OutputNode";

export default class NodeRegister {
    constructor() {
        this.LiteGraph = require("litegraph.js/build/litegraph.js").LiteGraph;
    }

    register() {
        this.LiteGraph.clearRegisteredTypes();
        //PUT NODES HERE TO REGISTER THEM AUTOMATICALLY
        this.LiteGraph.registerNodeType("output/OutputNode", OutputNode);
    }

    getLiteGraph() {
        return this.LiteGraph;
    }
}