//IMPORT NODES
import { OutputNode } from "./Nodes/OutputNode";
import { RandomNoiseNode } from "./Nodes/RandomNoise";
import { ImageInputNode } from "./Nodes/ImageInputNode";
import { GrayscaleEffectNode } from "./Nodes/GrayscaleEffectNode";
import { NegativeEffectNode } from "./Nodes/NegativeEffectNode";
import { ChromaKeyingEffectNode } from "./Nodes/ChromaKeyingEffectNode";
import { WebcamInputNode } from "./Nodes/WebcamInputNode";
import { MergeNode } from "./Nodes/MergeNode";

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
    this.LiteGraph.registerNodeType("input/WebcamInput", WebcamInputNode);
    this.LiteGraph.registerNodeType("effect/Grayscale", GrayscaleEffectNode);
    this.LiteGraph.registerNodeType("effect/NegativeEffect", NegativeEffectNode);
    this.LiteGraph.registerNodeType("effect/ChromaKeyingEffectNode", ChromaKeyingEffectNode);
    this.LiteGraph.registerNodeType("merge/Merge", MergeNode);
  }

  getLiteGraph() {
    return this.LiteGraph;
  }
}
