import NodeRegisterInstance from '../NodeRegister';

export function ButtonTriggerNode() {
    var LiteGraph = NodeRegisterInstance.getLiteGraph();
    this.addOutput("onClicked", LiteGraph.EVENT);
    this.button = this.addWidget("button", "Trigger", "", this.buttonClicked.bind(this))
}

ButtonTriggerNode.title = "Button Trigger";

ButtonTriggerNode.prototype.buttonClicked = function () {
    this.triggerSlot(0);
}

ButtonTriggerNode.prototype.onExecute = function () {
    ;
}
