export function RandomNoiseNode() {
  this.addOutput("Noise", "array");

  //NEW CANVAS FOR OUTPUT
  this.outCanvas = document.createElement("canvas");
  this.outCanvasCtx = this.outCanvas.getContext("2d");
}

RandomNoiseNode.title = "Random Noise";

RandomNoiseNode.prototype.onExecute = function () {
  var outputCanvas = document.getElementById("main-output-view");
  var width = outputCanvas.width;
  var height = outputCanvas.height;
  var pixelArrayLength = width * height * 4;

  this.outCanvas.width = width;
  this.outCanvas.height = height;
  var outputPixelArray = this.outCanvasCtx.createImageData(width, height);

  for (let i = 0; i < pixelArrayLength; i++) {
    outputPixelArray.data[i] = Math.random() * 255;
  }

  this.setOutputData(0, outputPixelArray);
};
