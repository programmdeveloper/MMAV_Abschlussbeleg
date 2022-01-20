export function RandomNoiseNode() {
    this.addOutput("Noise", "array");

    this.widthWidget = this.addWidget("number", "Width", 720, null, { min: 0, max: 4096, step: 10 });
    this.heightWidget = this.addWidget("number", "Height", 360, null, { min: 0, max: 2160, step: 10 });

    //NEW CANVAS FOR OUTPUT
    this.outCanvas = document.createElement('canvas')
    this.outCanvasCtx = this.outCanvas.getContext("2d");
}

RandomNoiseNode.title = "Random Noise";

RandomNoiseNode.prototype.onExecute = function () {
    var width = this.widthWidget.value;
    var height = this.heightWidget.value;

    if(width < 0) {
        width = 0
    }

    if(height < 0 ) {
        height = 0;
    }
    
    this.outCanvas.width = width
    this.outCanvas.height = height
    var outputPixelArray = this.outCanvasCtx.createImageData(width, height);

    for (let i = 0; i < outputPixelArray.data.length;i++) {
        outputPixelArray.data[i] = Math.random() * 255;
    }

    this.setOutputData(0, outputPixelArray);
}