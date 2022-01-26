export function InterpolationEffectNode() {
  this.addInput("In", "array");
  this.addOutput("Out", "array");
}

InterpolationEffectNode.title = "InterpolationEffect";

InterpolationEffectNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
  if (this.flags.collapsed) return;
  ctx.save();
  ctx.fillStyle = "#65696f";
  ctx.fillRect(0, 0, this.size[0], this.size[1]);
  ctx.restore();
};

InterpolationEffectNode.prototype.onExecute = function () {
  if (!this.getInputData(0)) return;
  var pixelArray = this.getInputData(0);
  var outputPixelArray = new ImageData(pixelArray.width, pixelArray.height);

  for (let i = 0; i < pixelArray.data.length; i += 4) {
    let count = pixelArray.data[i] + pixelArray.data[i + 1] + pixelArray.data[i + 2];
    let colour = 0;
    if (count > 510) colour = 255;
    else if (count > 255) colour = 127.5;

    outputPixelArray.data[i] = colour;
    outputPixelArray.data[i + 1] = colour;
    outputPixelArray.data[i + 2] = colour;
    outputPixelArray.data[i + 3] = 255;
  }
  this.setOutputData(0, outputPixelArray);
};
