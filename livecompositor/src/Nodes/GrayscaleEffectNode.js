export function GrayscaleEffectNode() {
  this.addInput("Out", "array");
  this.addOutput("Out", "array");
}

GrayscaleEffectNode.title = "GrayscaleEffect";

GrayscaleEffectNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
  if (this.flags.collpased) return;
  ctx.save();
  ctx.fillStyle = "#65696f";
  ctx.fillRect(0, 0, this.size[0], this.size[1]);
  ctx.restore;
};

GrayscaleEffectNode.prototype.onExecute = function () {
  var pixelArray = this.getInputData(0);
  for (let i = 0; i < pixelArray.data.length; i += 4) {
    let count = pixelArray.data[i] + pixelArray.data[i + 1] + pixelArray.data[i + 2];
    let colour = 0;
    if (count > 510) colour = 255;
    else if (count > 255) colour = 127.5;

    pixelArray.data[i] = colour;
    pixelArray.data[i + 1] = colour;
    pixelArray.data[i + 2] = colour;
    pixelArray.data[i + 3] = 255;
  }
  this.setOutputData(0, pixelArray);
};
