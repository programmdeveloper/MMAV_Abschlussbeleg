export function BlurEffectNode() {
  this.addInput("In", "array");
  this.addOutput("Out", "array");
  this.blurValue = this.addWidget("number", "Width", 0.1, { step: 0.1, property: "value" });
  //Gausskernel Berechnung
  const GAUSSKERN = 6.0;
  var dim = parseInt(Math.max(3.0, GAUSSKERN * blurValue));
  var sqrtBlurValuePi2 = Math.sqrt(Math.PI * 2.0) * blurValue;
  var s2 = 2.0 * blurValue * blurValue;
  var sum = 0.0;

  var kernel = new Float32Array(dim - !(dim & 1));
  for (var j = 0, i = -parseInt(kernel.length / 2); j < kernel.length; i++, j++) {
    kernel[j] = Math.exp(-(i * i) / s2) / sqrtBlurValuePi2;
    sum += kernel[j];
  }
  // Normalie Kernel
  for (var i = 0; i < dim; i++) {
    kernel[i] /= sum;
  }
  this.gaussKernel = kernel;
}

BlurEffectNode.title = "BlurEffect";

BlurEffectNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
  if (this.flags.collapsed) return;
  ctx.save();
  ctx.fillStyle = "#705f95";
  ctx.fillRect(0, 0, this.size[0], this.size[1]);
  ctx.restore();
};

BlurEffectNode.prototype.onExecute = function () {
  if (!this.getInputData(0)) return;
  var pixelArray = this.getInputData(0);
  try {
    var width = pixelArray.width;
    var height = pixelArray.height;
  } catch {
    var width = 720;
    var height = 360;
  }
  var buffer = new Uint8Array(width * height);

  for (let i = 0; i < pixelArray.data.length; i += 4) {
    pixelArray.data[i] = 255 - pixelArray.data[i];
    pixelArray.data[i + 1] = 255 - pixelArray.data[i + 1];
    pixelArray.data[i + 2] = 255 - pixelArray.data[i + 2];
    pixelArray.data[i + 3] = 255;
  }
  this.setOutputData(0, pixelArray);
};
