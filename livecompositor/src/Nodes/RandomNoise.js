export function RandomNoiseNode() {
    this.addOutput("Noise", "array");
}

RandomNoiseNode.title = "Random Noise";

RandomNoiseNode.prototype.onExecute = function () {
    var outputCanvas = document.getElementById('main-output-view');
    var width = outputCanvas.width;
    var height = outputCanvas.height;
    var pixelArrayLength = width*height*4;

    var outputPixelArray = []

    for(let i=0; i < pixelArrayLength;i++) {
        outputPixelArray[i] = Math.random() * 255;
    }

    this.setOutputData(0, outputPixelArray);
}