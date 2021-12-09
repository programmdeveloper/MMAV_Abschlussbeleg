import { ZOOMFACTOR, OFFSET_X, OFFSET_Y } from "../Components/OutputView";

export function OutputNode() {
    this.addInput("Out", "array");
    this.prevPixelArray = [];
}

OutputNode.title = "Output";

OutputNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
    if (this.flags.collapsed)
        return;
    ctx.save();
    ctx.fillStyle = "#228B22";
    ctx.fillRect(0, 0, this.size[0], this.size[1]);
    ctx.restore();
}

OutputNode.prototype.onExecute = function () {
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
        if(inputPixelArray != undefined) {
            if(inputPixelArray.length == undefined) {
                for (let i = 0; i < inputPixelArray.data.length; i++) {
                    outputPixelArray.data[i] = inputPixelArray.data[i]
                }
            } else {
                for(let i=0; i< inputPixelArray.length;i++) {
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
        var offsetX = (width - width * ((inputWidth * ZOOMFACTOR)/ width)) * 0.5
        var offsetY = (height - height * ((inputHeight * ZOOMFACTOR) / height)) * 0.5

        outputCanvasContext.translate(offsetX + OFFSET_X, offsetY + OFFSET_Y)
        outputCanvasContext.scale(ZOOMFACTOR,ZOOMFACTOR)
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