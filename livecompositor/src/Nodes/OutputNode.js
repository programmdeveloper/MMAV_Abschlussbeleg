import { ZOOMFACTOR, OFFSET_X, OFFSET_Y } from "../Components/OutputView";
import { v4 as uuidv4 } from 'uuid';
import outRegistry from '../OutputRegistry';

export function OutputNode() {
  this.addInput("Out", "array");
  this.prevPixelArray = [];

  this.id = uuidv4();

  this.active = this.addWidget("toggle", "Active", false, this.activeToggled.bind(this));
}

OutputNode.title = "Output";

OutputNode.prototype.getId = function () {
  return this.id;
}

OutputNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
  if (this.flags.collapsed)
    return;
  ctx.save();
  ctx.fillStyle = "#00334d";
  ctx.fillRect(0, 0, this.size[0], this.size[1]);

  //Border
  const BORDERSTRENGTH = 4
  if (this.active.value) {
    ctx.beginPath();
    ctx.strokeStyle = "#00FF00";
    ctx.lineWidth = BORDERSTRENGTH;
    ctx.rect(0 + BORDERSTRENGTH / 2, 0 + BORDERSTRENGTH / 2, this.size[0] - BORDERSTRENGTH, this.size[1] - BORDERSTRENGTH);
    ctx.stroke();
  }
  ctx.restore();
}

OutputNode.prototype.onAdded = function () {
  outRegistry.addOutputNode(this);
}

OutputNode.prototype.onRemoved = function () {
  outRegistry.removeOutputNode(this);
}

OutputNode.prototype.activeToggled = function () {
  if (this.active.value === true) {
    outRegistry.setCurrentVideoOut(this);
  } else {
    outRegistry.setCurrentVideoOut(null);
  }
}

OutputNode.prototype.updateActiveState = function () {
  try {
    var isActive = this.id === outRegistry.getCurrentVideoOut().getId()
    if (this.active.value !== isActive) {
      this.active.value = isActive
    }
  } catch {
    this.active.value = false;
  }
}

OutputNode.prototype.onExecute = function () {
  if (this.active.value == false) {
    return;
  }

  var outputCanvas = document.getElementById('main-output-view');
  var outputCanvasContext = outputCanvas.getContext('2d');
  var width = outputCanvas.width;
  var height = outputCanvas.height;

  //INPUT
  var inputPixelArray = this.getInputData(0);
  try {
    var inputWidth = inputPixelArray.width;
    var inputHeight = inputPixelArray.height;
  } catch {
    var inputWidth = 720;
    var inputHeight = 360;
  }

  //NEW CANVAS FOR UNSCALED IMAGE (WILL BE RENDERED IN OUTPUT CANVAS)
  var scaleCanvas = document.createElement('canvas')
  scaleCanvas.width = inputWidth
  scaleCanvas.height = inputHeight
  let scaleCanvasCtx = scaleCanvas.getContext("2d");

  var outputPixelArray = scaleCanvasCtx.createImageData(inputWidth, inputHeight);

  if (this.prevPixelArray !== inputPixelArray) {

    outputCanvasContext.fillStyle = "black"
    outputCanvasContext.fillRect(0, 0, width, height);

    //COPY INPUT PIXEL ARRAY TO OUTPUT
    if (inputPixelArray != undefined) {
      if (inputPixelArray.length == undefined) {
        for (let i = 0; i < inputPixelArray.data.length; i++) {
          outputPixelArray.data[i] = inputPixelArray.data[i]
        }
      } else {
        for (let i = 0; i < inputPixelArray.length; i++) {
          outputPixelArray.data[i] = inputPixelArray[i]
        }
      }
    }

    scaleCanvasCtx.putImageData(outputPixelArray, 0, 0);

    //BORDER AROUND SCALED IMAGE
    scaleCanvasCtx.lineWidth = 3;
    scaleCanvasCtx.strokeStyle = "#FF0000";
    scaleCanvasCtx.strokeRect(0, 0, inputWidth, inputHeight);

    //SCALE UNSCALED IMAGE AND DRAW IN OUTPUT
    var offsetX = (width - width * ((inputWidth * ZOOMFACTOR) / width)) * 0.5
    var offsetY = (height - height * ((inputHeight * ZOOMFACTOR) / height)) * 0.5

    outputCanvasContext.translate(offsetX + OFFSET_X, offsetY + OFFSET_Y)
    outputCanvasContext.scale(ZOOMFACTOR, ZOOMFACTOR)
    outputCanvasContext.drawImage(scaleCanvas, 0, 0);
    //RESOLUTION OVERLAY
    outputCanvasContext.font = "30px Consolas";
    outputCanvasContext.fillStyle = "grey"
    outputCanvasContext.fillText(inputWidth + "x" + inputHeight, 0, inputHeight + 30);
    outputCanvasContext.scale(1 / ZOOMFACTOR, 1 / ZOOMFACTOR)
    outputCanvasContext.translate(-(offsetX + OFFSET_X), -(offsetY + OFFSET_Y))
    this.prevPixelArray = inputPixelArray
  }
}