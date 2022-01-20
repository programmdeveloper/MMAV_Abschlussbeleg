export function ChromaKeyingEffectNode() {
  this.addInput("In", "array");
  this.addOutput("Out", "array");
  //Widgets
  this.chroma = this.addWidget("combo", "Chroma", "green", {
    values: ["red", "green", "blue", "white", "black"],
  });
}

ChromaKeyingEffectNode.title = "ChromaKeyingEffect";

ChromaKeyingEffectNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
  if (this.flags.collapsed) return;
  ctx.save();
  ctx.fillStyle = "#75c32c";
  ctx.fillRect(0, 0, this.size[0], this.size[1]);
  ctx.restore();
};

ChromaKeyingEffectNode.prototype.onExecute = function () {
  if (!this.getInputData(0)) return;
  var pixelArray = this.getInputData(0);
  for (let i = 0; i < pixelArray.data.length; i += 4) {
    const red = pixelArray.data[i + 0];
    const green = pixelArray.data[i + 1];
    const blue = pixelArray.data[i + 2];
    //preset black
    switch (this.chroma.value) {
      case "green":
        if (red <= 45 && green >= 100 && blue <= 45 && Math.abs(red - blue) <= 30) {
          pixelArray.data[i + 3] = 0;
        }
        break;
      case "red":
        if (red >= 150 && green <= 30 && blue <= 30 && Math.abs(green - blue) <= 20) {
          pixelArray.data[i + 3] = 0;
        }
        break;
      case "blue":
        if (red <= 45 && green <= 45 && blue >= 125 && Math.abs(red - green) <= 25) {
          pixelArray.data[i + 3] = 0;
        }
        break;
      case "black":
        if (
          red <= 40 &&
          green <= 40 &&
          blue <= 40 &&
          Math.abs(red - green) <= 5 &&
          Math.abs(red - blue) <= 5
        ) {
          pixelArray.data[i + 3] = 0;
        }
        break;
      case "white":
        if (
          red >= 210 &&
          green <= 210 &&
          blue <= 210 &&
          Math.abs(red - green) <= 5 &&
          Math.abs(red - blue) <= 5
        ) {
          pixelArray.data[i + 3] = 0;
        }
        break;
    }
  }
  this.setOutputData(0, pixelArray);
};
