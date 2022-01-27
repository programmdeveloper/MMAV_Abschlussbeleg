export function ContrastEffectNode() {
  this.addInput("In", "array");
  this.addOutput("Out", "array");
  this.contrast = this.addWidget("slider", "Contrast", 0, function () {}, {
    min: -100,
    max: 100,
  });
}

ContrastEffectNode.title = "ContrastEffect";

ContrastEffectNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
  if (this.flags.collapsed) return;
  ctx.save();
  ctx.fillStyle = "#ccccff";
  ctx.fillRect(0, 0, this.size[0], this.size[1]);
  ctx.restore();
};

ContrastEffectNode.prototype.onExecute = function () {
  if (!this.getInputData(0)) return;
  var pixelArray = this.getInputData(0);
  var outputPixelArray = new ImageData(pixelArray.width, pixelArray.height);
  var contrastFactor =
    (259.0 * (this.contrast.value + 255.0)) / (255.0 * (259.0 - this.contrast.value));

  for (let i = 0; i < pixelArray.data.length; i += 4) {
    outputPixelArray.data[i] = contrastFactor * (pixelArray.data[i] - 128.0) + 128.0;
    outputPixelArray.data[i + 1] = contrastFactor * (pixelArray.data[i + 1] - 128.0) + 128.0;
    outputPixelArray.data[i + 2] = contrastFactor * (pixelArray.data[i + 2] - 128.0) + 128.0;
    outputPixelArray.data[i + 3] = pixelArray.data[i + 3];
  }
  this.setOutputData(0, outputPixelArray);
};
