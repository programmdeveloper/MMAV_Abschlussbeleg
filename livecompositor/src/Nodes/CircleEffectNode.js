export function CircleEffectNode() {
  this.addInput("In", "array");
  this.addOutput("Out", "array");
  //Set global values
  this.inputWidth = 0;
  this.circleCoordinates = null;
  //Widgets
  this.circlePositionX = this.addWidget("number", "Width", 100, { step: 1, property: "value" });
  this.circlePositionY = this.addWidget("number", "Height", 100, { step: 1, property: "value" });
  this.circleRadius = this.addWidget("slider", "Radius", 50, function () {}, {
    min: 0,
    max: 100,
  });
}

CircleEffectNode.title = "CircleEffect";

CircleEffectNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
  if (this.flags.collapsed) return;
  ctx.save();
  ctx.fillStyle = "#b0c4de";
  ctx.fillRect(0, 0, this.size[0], this.size[1]);
  ctx.restore();
};

CircleEffectNode.prototype.onExecute = function () {
  if (!this.getInputData(0)) return;
  var pixelArray = this.getInputData(0);
  if (this.inputWidth === 0) {
    try {
      this.inputWidth = pixelArray.width;
    } catch {
      this.inputWidth = 720;
    }
  }
  var counter = 0;
  if (this.circleCoordinates == null) {
    this.circleCoordinates = new Uint8Array(pixelArray.length);
    var height = 0;
    for (let i = 0; i < pixelArray.data.length; i += 4) {
      if (i % (this.inputWidth * 4) == 0) {
        height += 1;
      }
      if (
        Math.pow((i % (this.inputWidth * 4)) + 1 - this.circlePositionX, 2) +
          Math.pow(height - this.circlePositionY, 2) <
        Math.pow(this.circleRadius, 2)
      ) {
        this.circleCoordinates.push(i);
      }
    }
  }
  for (let i = 0; i < pixelArray.data.length; i += 4) {
    if (i == this.circleCoordinates[counter]) {
      pixelArray.data[i] = 0;
      pixelArray.data[i + 1] = 0;
      pixelArray.data[i + 2] = 255;
      pixelArray.data[i + 3] = 255;
    }
  }
  this.setOutputData(0, pixelArray);
};
