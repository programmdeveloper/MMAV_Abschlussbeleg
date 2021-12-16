export function MergeNode() {
    this.addInput("A", "array");
    this.addInput("B", "array");
    this.addOutput("Out", "array");

    //NEW CANVAS FOR INPUT A
    this.aCanvas = document.createElement('canvas')
    this.aCanvasCtx = this.aCanvas.getContext("2d");

    //NEW CANVAS FOR INPUT B
    this.bCanvas = document.createElement('canvas')
    this.bCanvasCtx = this.bCanvas.getContext("2d");

    //NEW CANVAS FOR OUTPUT
    this.outCanvas = document.createElement('canvas')
    this.outCanvasCtx = this.outCanvas.getContext("2d");
}

MergeNode.title = "Merge";

MergeNode.prototype.onExecute = function () {
    var inputA = this.getInputData(0);
    var inputB = this.getInputData(1);

    var outWidth = 720;
    var outHeight = 360;

    if (inputA !== null && inputA !== undefined && inputA.data.length > 0) {
        outWidth = inputA.width;
        outHeight = inputA.height;
    } else if (inputB !== null && inputB !== undefined && inputB.data.length > 0) {
        outWidth = inputB.width;
        outHeight = inputB.height;
    }

    //SET INPUT B CANVAS SIZE
    if (inputB !== null && inputB !== undefined && inputB.data.length > 0) {
        this.bCanvas.width = inputB.width;
        this.bCanvas.height = inputB.height;
        this.bCanvasCtx.putImageData(inputB, 0, 0);
        this.outCanvasCtx.drawImage(this.bCanvas, 0, 0);
    }

    //SET INPUT A CANVAS SIZE
    if(inputA !== null && inputA !== undefined && inputA.data.length > 0) {
        this.aCanvas.width = inputA.width;
        this.aCanvas.height = inputA.height;
        this.aCanvasCtx.putImageData(inputA, 0, 0);
        this.outCanvasCtx.drawImage(this.aCanvas, 0, 0);
    }

    //SET OUTPUT CANVAS SIZE
    this.outCanvas.width = outWidth
    this.outCanvas.height = outHeight

    var outputPixelArray = this.outCanvasCtx.getImageData(0, 0, outWidth, outHeight);
    this.setOutputData(0, outputPixelArray);
}