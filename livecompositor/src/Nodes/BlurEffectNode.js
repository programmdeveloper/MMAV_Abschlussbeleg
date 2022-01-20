export function BlurEffectNode() {
  this.addInput("In", "array");
  this.addOutput("Out", "array");
  this.blur = this.addWidget("slider", "Blur value", 0, function () {}, {
    min: 0,
    max: 16,
  });
  this.blurValuePrev = 0;
  this.gaussKernel = null;
}

BlurEffectNode.title = "BlurEffect";

BlurEffectNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
  if (this.flags.collapsed) return;
  ctx.save();
  ctx.fillStyle = "#705f95";
  ctx.fillRect(0, 0, this.size[0], this.size[1]);
  ctx.restore();
};

BlurEffectNode.prototype.createGaussKernel = function () {
  //Gausskernel function from https://fiveko.com/programming/gaussian-filter-in-pure-javascript/
  const GAUSSKERNEL = 6.0;
  var dim = parseInt(Math.max(3.0, GAUSSKERNEL * this.blur.value));
  var sqrtSigmaP2 = Math.sqrt(Math.PI * 2.0) * this.blur.value;
  var s2 = 2.0 * this.blur.value * this.blur.value;
  var sum = 0.0;

  var kernel = new Float32Array(dim - !(dim & 1));
  for (var j = 0, i = -parseInt(kernel.length / 2); j < kernel.length; i++, j++) {
    kernel[j] = Math.exp(-(i * i) / s2) / sqrtSigmaP2;
    sum += kernel[j];
  }
  for (var i = 0; i < dim; i++) {
    kernel[i] /= sum;
  }
  this.gaussKernel = kernel;
};

BlurEffectNode.prototype.applyBlurEffect = function (pixelArray) {
  var data = pixelArray.data;
  var width = pixelArray.width;
  var height = pixelArray.height;
  var bufferRed = new Uint8Array(width * height);
  var bufferGreen = new Uint8Array(width * height);
  var bufferBlue = new Uint8Array(width * height);
  var kernelHalf = Math.floor(this.gaussKernel.length / 2);
  var kernelLength = this.gaussKernel.length;

  //columns
  for (var j = 0, hw = 0; j < height; j++, hw += width) {
    for (var i = 0; i < width; i++) {
      var sumRed = 0;
      var sumGreen = 0;
      var sumBlue = 0;
      for (var k = 0; k < kernelLength; k++) {
        var col = i + (k + kernelHalf);
        col = col < 0 ? 0 : col >= width ? width - 1 : col;
        sumRed += data[(hw + col) * 4] * this.gaussKernel[k];
        sumGreen += data[(hw + col) * 4 + 1] * this.gaussKernel[k];
        sumBlue += data[(hw + col) * 4 + 2] * this.gaussKernel[k];
      }
      bufferRed[hw + i] = sumRed;
      bufferGreen[hw + i] = sumGreen;
      bufferBlue[hw + i] = sumBlue;
    }
  }
  //rows
  for (var j = 0; j < height; j++) {
    for (var i = 0; i < width; i++) {
      sumRed = 0;
      sumGreen = 0;
      sumBlue = 0;
      for (k = 0; k < kernelLength; k++) {
        var row = j + (k + kernelHalf);
        row = row < 0 ? 0 : row >= height ? height - 1 : row;
        sumRed += bufferRed[row * width + i] * this.gaussKernel[k];
        sumGreen += bufferGreen[row * width + i] * this.gaussKernel[k];
        sumBlue += bufferBlue[row * width + i] * this.gaussKernel[k];
      }
      var offset = (j * width + i) * 4;
      data[offset] = sumRed;
      data[offset + 1] = sumGreen;
      data[offset + 2] = sumBlue;
    }
  }
  return pixelArray;
};

BlurEffectNode.prototype.onExecute = function () {
  if (!this.getInputData(0)) return;
  if (!this.gaussKernel) this.createGaussKernel();
  if (this.blur.value != this.blurValuePrev) {
    this.blurValuePrev = this.blur.value;
    this.createGaussKernel();
  }
  var pixelOut = this.applyBlurEffect(this.getInputData(0));
  this.setOutputData(0, pixelOut);
};
