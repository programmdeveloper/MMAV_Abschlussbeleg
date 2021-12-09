import { ZOOMFACTOR } from "../Components/OutputView";

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
    console.log(ZOOMFACTOR);
    var outputCanvas = document.getElementById('main-output-view');
    var outputCanvasContext = outputCanvas.getContext('2d');
    var width = outputCanvas.width;
    var height = outputCanvas.height;
    var outputPixelArray = outputCanvasContext.createImageData(width, height);

    //DEFAULT PREVIEW
    outputCanvasContext.fillStyle = "black"
    outputCanvasContext.fillRect(0, 0, width, height);

    var inputPixelArray = this.getInputData(0);

    if (this.prevPixelArray !== inputPixelArray) {

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

        let unscaledImage = outputPixelArray
        var scaleCanvas = document.createElement('canvas')
        scaleCanvas.width = width
        scaleCanvas.height = height

        //BORDER AROUND SCALED IMAGE
        let scaleCanvasCtx = scaleCanvas.getContext("2d");
        scaleCanvasCtx.putImageData(unscaledImage, 0, 0);
        scaleCanvasCtx.lineWidth = 2;
        scaleCanvasCtx.strokeStyle = "#FF0000";
        scaleCanvasCtx.strokeRect(0, 0, width, height);

        //SCALE AND DRAW
        outputCanvasContext.scale(ZOOMFACTOR, ZOOMFACTOR)
        outputCanvasContext.translate(width * ZOOMFACTOR, height * ZOOMFACTOR)
        
        outputCanvasContext.drawImage(scaleCanvas, 0, 0);
        this.prevPixelArray = inputPixelArray

        outputCanvasContext.translate(width * -ZOOMFACTOR, height * -ZOOMFACTOR)
        outputCanvasContext.scale(1/ZOOMFACTOR, 1/ZOOMFACTOR)
    }
}