export function BrightnessEffectNode() {
  this.addInput("In", "array");
  this.addOutput("Out", "array");
  this.brightness = this.addWidget("slider", "Brightness", 0, function () {}, {
    min: -100,
    max: 100,
  });
}

BrightnessEffectNode.title = "BrightnessEffect";

BrightnessEffectNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
  if (this.flags.collapsed) return;
  ctx.save();
  ctx.fillStyle = "#f2e84d";
  ctx.fillRect(0, 0, this.size[0], this.size[1]);
  ctx.restore();
};

BrightnessEffectNode.prototype.onExecute = function () {
  if (!this.getInputData(0)) return;
  var pixelArray = this.getInputData(0);
  var outputPixelArray = new ImageData(pixelArray.width, pixelArray.height);
  var brightnessValue = this.brightness.value;

  for (let i = 0; i < pixelArray.data.length; i += 4) {
    outputPixelArray.data[i] = pixelArray.data[i] + 255 * (brightnessValue / 100.0);
    outputPixelArray.data[i + 1] = pixelArray.data[i + 1] + 255 * (brightnessValue / 100.0);
    outputPixelArray.data[i + 2] = pixelArray.data[i + 2] + 255 * (brightnessValue / 100.0);
    outputPixelArray.data[i + 3] = 255;
  }
  this.setOutputData(0, outputPixelArray);
};
