export function OutputNode() {
    this.addInput("Out", "array");
}

OutputNode.title = "Output";

OutputNode.prototype.onExecute = function () {
    var outputCanvas = document.getElementById('main-output-view');
    var outputCanvasContext = outputCanvas.getContext('2d');
    var inputPixelArray = this.getInputData(0);

    //outputCanvasContext.putImageData(inputPixelArray);
}