export function NegativeEffectNode() {
  this.addInput("In", "array");
  this.addOutput("Out", "array");
}

NegativeEffectNode.title = "NegativeEffect";

NegativeEffectNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
  if (this.flags.collapsed) return;
  ctx.save();
  ctx.fillStyle = "#705f95";
  ctx.fillRect(0, 0, this.size[0], this.size[1]);
  ctx.restore();
};

NegativeEffectNode.prototype.onExecute = function () {
  if (!this.getInputData(0)) return;
  var pixelArray = this.getInputData(0);
  for (let i = 0; i < pixelArray.data.length; i += 4) {
    pixelArray.data[i] = 255 - pixelArray.data[i];
    pixelArray.data[i + 1] = 255 - pixelArray.data[i + 1];
    pixelArray.data[i + 2] = 255 - pixelArray.data[i + 2];
    pixelArray.data[i + 3] = 255;
  }
  this.setOutputData(0, pixelArray);
};
