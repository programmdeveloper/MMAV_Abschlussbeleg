export function DuotoneEffectNode() {
  this.addInput("In", "array");
  this.addOutput("Out", "array");
  this.properties = {
    colorFrom: "#000000",
    colorTo: "#FFFFFF",
  };
  this.previouscolorFrom = "#000000";
  this.previouscolorTo = "#FFFFFF";
  this.colorFrom_RGB = { red: 0, green: 0, blue: 0 };
  this.colorTo_RGB = { red: 255, green: 255, blue: 255 };
  this.gradient = [];
}

DuotoneEffectNode.title = "DuotoneEffect";

DuotoneEffectNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
  if (this.flags.collapsed) return;
  ctx.save();
  ctx.fillStyle = "#65696f";
  ctx.fillRect(0, 0, this.size[0], this.size[1]);
  ctx.restore();
};

DuotoneEffectNode.prototype.onExecute = function () {
  if (!this.getInputData(0)) return;
  if (this.gradient.length === 0) {
    this.updateRGB();
    this.updateGradient();
  }
  if (
    this.previouscolorFrom !== this.properties.colorFrom ||
    this.previouscolorTo !== this.properties.colorTo
  ) {
    this.updateRGB();
    this.updateGradient();
    this.previouscolorFrom = this.properties.colorFrom;
    this.previouscolorTo = this.properties.colorTo;
  }
  var pixelArray = this.getInputData(0);
  for (let i = 0; i < pixelArray.data.length; i += 4) {
    pixelArray.data[i] = this.gradient[pixelArray.data[i]].red;
    pixelArray.data[i + 1] = this.gradient[pixelArray.data[i + 1]].green;
    pixelArray.data[i + 2] = this.gradient[pixelArray.data[i + 2]].blue;
  }
  this.setOutputData(0, pixelArray);
};

DuotoneEffectNode.prototype.updateRGB = function () {
  if (this.properties.colorFrom[0] === "#" && this.properties.colorTo[0] === "#") {
    this.colorFrom_RGB.red = parseInt(
      this.properties.colorFrom[1] + this.properties.colorFrom[2],
      16
    );
    this.colorFrom_RGB.green = parseInt(
      this.properties.colorFrom[3] + this.properties.colorFrom[4],
      16
    );
    this.colorFrom_RGB.blue = parseInt(
      this.properties.colorFrom[5] + this.properties.colorFrom[6],
      16
    );
    this.colorTo_RGB.red = parseInt(this.properties.colorTo[1] + this.properties.colorTo[2], 16);
    this.colorTo_RGB.green = parseInt(this.properties.colorTo[3] + this.properties.colorTo[4], 16);
    this.colorTo_RGB.blue = parseInt(this.properties.colorTo[5] + this.properties.colorTo[6], 16);
  }
};

DuotoneEffectNode.prototype.updateGradient = function () {
  var maxValue = 255;
  for (var i = 0; i <= maxValue; i++) {
    var intensityB = i;
    var intensityA = maxValue - intensityB;
    var rTemp =
      (intensityA * this.colorFrom_RGB.red + intensityB * this.colorTo_RGB.red) / maxValue;
    var gTemp =
      (intensityA * this.colorFrom_RGB.green + intensityB * this.colorTo_RGB.green) / maxValue;
    var bTemp =
      (intensityA * this.colorFrom_RGB.blue + intensityB * this.colorTo_RGB.blue) / maxValue;

    this.gradient[i] = {
      red: rTemp,
      green: gTemp,
      blue: bTemp,
    };
  }
};
