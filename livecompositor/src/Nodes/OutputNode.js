export function OutputNode() {
  this.addInput("Out", "array");
  this.prevPixelArray = [];
}

OutputNode.title = "Output";

OutputNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
  if (this.flags.collapsed) return;
  ctx.save();
  ctx.fillStyle = "#228B22";
  ctx.fillRect(0, 0, this.size[0], this.size[1]);
  ctx.restore();
};

OutputNode.prototype.onExecute = function () {
  var outputCanvas = document.getElementById("main-output-view");
  var outputCanvasContext = outputCanvas.getContext("2d");
  var width = outputCanvas.width;
  var height = outputCanvas.height;
  var outputPixelArray = outputCanvasContext.createImageData(width, height);

  var inputPixelArray = this.getInputData(0);

  if (this.prevPixelArray !== inputPixelArray) {
    //DEFAULT BLACK
    for (let i = 0; i < outputPixelArray.data.length; i += 4) {
      outputPixelArray.data[i] = 0;
      outputPixelArray.data[i + 1] = 0;
      outputPixelArray.data[i + 2] = 0;
      outputPixelArray.data[i + 3] = 255;
    }

    if (inputPixelArray !== undefined) {
      if (inputPixelArray.length === undefined) {
        for (let i = 0; i < inputPixelArray.data.length; i++) {
          outputPixelArray.data[i] = inputPixelArray.data[i];
        }
      } else {
        for (let i = 0; i < inputPixelArray.length; i++) {
          outputPixelArray.data[i] = inputPixelArray[i];
        }
      }
    }

    outputCanvasContext.putImageData(outputPixelArray, 0, 0);
    this.prevPixelArray = inputPixelArray;
  }
};
