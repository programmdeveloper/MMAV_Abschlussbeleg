export function GrayscaleEffectNode() {
  this.addInput("In", "array");
  this.addOutput("Out", "array");
}

GrayscaleEffectNode.title = "GrayscaleEffect";

GrayscaleEffectNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
  if (this.flags.collapsed) return;
  ctx.save();
  ctx.fillStyle = "#65696f";
  ctx.fillRect(0, 0, this.size[0], this.size[1]);
  ctx.restore();
};

GrayscaleEffectNode.prototype.onExecute = function () {
  if (!this.getInputData(0)) return;
  var pixelArray = this.getInputData(0);
  var outputPixelArray = new ImageData(pixelArray.width, pixelArray.height);

  for (let i = 0; i < pixelArray.data.length; i += 4) {
    let count = pixelArray.data[i] + pixelArray.data[i + 1] + pixelArray.data[i + 2];

    outputPixelArray.data[i] = count / 3;
    outputPixelArray.data[i + 1] = count / 3;
    outputPixelArray.data[i + 2] = count / 3;
    outputPixelArray.data[i + 3] = pixelArray.data[i + 3];
  }
  this.setOutputData(0, outputPixelArray);
};
