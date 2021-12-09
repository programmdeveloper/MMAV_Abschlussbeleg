export function ChromaKeyingEffectNode() {
  this.addInput("Out", "array");
  this.addOutput("Out", "array");
}

ChromaKeyingEffectNode.title = "ChromaKeyingEffect";

ChromaKeyingEffectNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
  if (this.flags.collpased) return;
  ctx.save();
  ctx.fillStyle = "#75c32c";
  ctx.fillRect(0, 0, this.size[0], this.size[1]);
  ctx.restore;
};

ChromaKeyingEffectNode.prototype.onExecute = function () {
  var pixelArray = this.getInputData(0);
  for (let i = 0; i < pixelArray.data.length; i += 4) {
    const red = pixelArray.data[i + 0];
    const green = pixelArray.data[i + 1];
    const blue = pixelArray.data[i + 2];
    //preset black
    if (green < 60 && red < 60 && blue < 60) {
      pixelArray.data[i + 3] = 0;
    } else if (green > 195 && red > 195 && blue > 195) {
      pixelArray.data[i + 3] = 0;
    }
  }
  this.setOutputData(0, pixelArray);
};
