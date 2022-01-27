//IMPORT NODES
import { OutputNode } from "./Nodes/OutputNode";
import { RandomNoiseNode } from "./Nodes/RandomNoise";
import { ImageInputNode } from "./Nodes/ImageInputNode";
import { GrayscaleEffectNode } from "./Nodes/GrayscaleEffectNode";
import { NegativeEffectNode } from "./Nodes/NegativeEffectNode";
import { ContrastEffectNode } from "./Nodes/ContrastEffectNode";
import { BrightnessEffectNode } from "./Nodes/BrightnessEffectNode";
import { ChromaKeyingEffectNode } from "./Nodes/ChromaKeyingEffectNode";
import { DuotoneEffectNode } from "./Nodes/DuotoneEffectNode";
import { WebcamInputNode } from "./Nodes/WebcamInputNode";
import { MergeNode } from "./Nodes/MergeNode";
import { AudioOutputNode } from "./Nodes/AudioOutputNode";
import { AudioMixerNode } from "./Nodes/AudioMixerNode";
import { ButtonTriggerNode } from "./Nodes/ButtonTriggerNode";

/**
 * Class for managing node registering
 */
class NodeRegister {
  constructor() {
    if (!NodeRegister._instance) {
      this.LiteGraph = require("litegraph.js/build/litegraph.js").LiteGraph;
      NodeRegister._instance = this;
    }
    return NodeRegister._instance;
  }

  /**
   * register nodes to be available in litegraph
   */
  register() {
    this.LiteGraph.clearRegisteredTypes();
    //PUT NODES HERE TO REGISTER THEM AUTOMATICALLY
    this.LiteGraph.registerNodeType("output/OutputNode", OutputNode);
    this.LiteGraph.registerNodeType("output/AudioOutputNode", AudioOutputNode);
    this.LiteGraph.registerNodeType("noise/RandomNoise", RandomNoiseNode);
    this.LiteGraph.registerNodeType("input/ImageInput", ImageInputNode);
    this.LiteGraph.registerNodeType("input/WebcamInput", WebcamInputNode);
    this.LiteGraph.registerNodeType("effect/Grayscale", GrayscaleEffectNode);
    this.LiteGraph.registerNodeType("effect/NegativeEffect", NegativeEffectNode);
    this.LiteGraph.registerNodeType("effect/ContrastEffect", ContrastEffectNode);
    this.LiteGraph.registerNodeType("effect/BrightnessEffect", BrightnessEffectNode);
    this.LiteGraph.registerNodeType("effect/DuotoneEffect", DuotoneEffectNode);
    this.LiteGraph.registerNodeType("effect/ChromaKeyingEffectNode", ChromaKeyingEffectNode);
    this.LiteGraph.registerNodeType("merge/Merge", MergeNode);
    this.LiteGraph.registerNodeType("merge/AudioMerge", AudioMixerNode);
    this.LiteGraph.registerNodeType("trigger/ButtonTrigger", ButtonTriggerNode);
  }

  /**
   * Get the litegraph instance.
   * @returns litegraph instance
   */
  getLiteGraph() {
    return this.LiteGraph;
  }
}

const instance = new NodeRegister();

export default instance;