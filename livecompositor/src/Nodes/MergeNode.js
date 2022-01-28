import NodeRegisterInstance from '../NodeRegister';

export function MergeNode() {
    this.addInput("A", "array");
    this.addInput("B", "array");
    this.addOutput("Out", "array");

    var LiteGraph = NodeRegisterInstance.getLiteGraph();
    this.addInput("A/B", LiteGraph.ACTION);

    this.operation = this.addWidget("combo", "Operation", "Over", null, { values: ["Over", "Multiply", "Add", "Subtract"] });
    this.bounds = this.addWidget("combo", "Bounding Box From", "B", null, { values: ["A", "B"] });
    this.mix = this.addWidget("slider", "Mix", 1, null, { min: 0, max: 1, step:0.1 });

    //NEW CANVAS FOR OUTPUT
    this.outCanvas = document.createElement('canvas')
    this.outCanvasCtx = this.outCanvas.getContext("2d");
}

MergeNode.title = "Merge";

MergeNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
    if (this.flags.collapsed)
        return;
    ctx.save();
    ctx.fillStyle = "#0000e6";
    ctx.fillRect(0, 0, this.size[0], this.size[1]);
    ctx.restore();
}

MergeNode.prototype.onAction = function (action, data) {
    if (action == "A/B") {
        if(this.mix.value < 1.0) {
            this.mix.value = 1.0
        } else {
            this.mix.value = 0.0
        }
    }

}

MergeNode.prototype.mergeNormal = function (pixelArrayA, pixelArrayB) {
    
    var outPixelArray = new Uint8Array(pixelArrayA.length);
    for (let i = 0; i < pixelArrayA.length; i += 4) {
        outPixelArray[i] = pixelArrayA[i] * this.mix.value + pixelArrayB[i] * ((255 - pixelArrayA[i + 3] * this.mix.value) / 255)
        outPixelArray[i + 1] = pixelArrayA[i + 1] * this.mix.value + pixelArrayB[i + 1] * ((255 - pixelArrayA[i + 3] * this.mix.value) / 255)
        outPixelArray[i + 2] = pixelArrayA[i + 2] * this.mix.value + pixelArrayB[i + 2] * ((255 - pixelArrayA[i + 3] * this.mix.value) / 255)
        outPixelArray[i + 3] = pixelArrayA[i + 3] + pixelArrayB[i + 3] * ((255 - pixelArrayA[i + 3]) / 255)
    }

    return outPixelArray;
}

MergeNode.prototype.mergeMultiply = function (pixelArrayA, pixelArrayB) {

    var outPixelArray = new Uint8Array(pixelArrayA.length);
    for (let i = 0; i < pixelArrayA.length; i += 4) {
        outPixelArray[i] = ((pixelArrayA[i]/255) * (pixelArrayB[i]/255)) * 255 * this.mix.value
        outPixelArray[i + 1] = ((pixelArrayA[i + 1] / 255) * (pixelArrayB[i + 1] / 255)) * 255 * this.mix.value
        outPixelArray[i + 2] = ((pixelArrayA[i + 2] / 255) * (pixelArrayB[i + 2] / 255)) * 255 * this.mix.value
        outPixelArray[i + 3] = ((pixelArrayA[i + 3] / 255) * (pixelArrayB[i + 3] / 255)) * 255 * this.mix.value
    }

    return outPixelArray;

}

MergeNode.prototype.mergeAdd = function (pixelArrayA, pixelArrayB) {
    var outPixelArray = new Uint8Array(pixelArrayA.length);
    for (let i = 0; i < pixelArrayA.length; i += 4) {
        outPixelArray[i] = pixelArrayA[i] * this.mix.value + pixelArrayB[i]
        outPixelArray[i + 1] = pixelArrayA[i + 1] * this.mix.value + pixelArrayB[i + 1]
        outPixelArray[i + 2] = pixelArrayA[i + 2] * this.mix.value + pixelArrayB[i + 2]
        outPixelArray[i + 3] = pixelArrayA[i + 3] * this.mix.value + pixelArrayB[i + 3]
    }

    return outPixelArray;
}

MergeNode.prototype.mergeSubtract = function (pixelArrayA, pixelArrayB) {
    var outPixelArray = new Uint8Array(pixelArrayA.length);
    for (let i = 0; i < pixelArrayA.length; i += 4) {
        outPixelArray[i] = pixelArrayA[i] * this.mix.value - pixelArrayB[i]
        outPixelArray[i + 1] = pixelArrayA[i + 1] * this.mix.value - pixelArrayB[i + 1]
        outPixelArray[i + 2] = pixelArrayA[i + 2] * this.mix.value - pixelArrayB[i + 2]
        outPixelArray[i + 3] = pixelArrayA[i + 3] * this.mix.value - pixelArrayB[i + 3]
    }

    return outPixelArray;
}


MergeNode.prototype.doMerge = function (pixelArrayA, pixelArrayB) {
    if (pixelArrayA.length !== pixelArrayB.length) {
        throw "Pixelarrays to merge must have the same length"
    }

    switch (this.operation.value) {
        case "Over":
            return this.mergeNormal(pixelArrayA, pixelArrayB);
        case "Multiply":
            return this.mergeMultiply(pixelArrayA, pixelArrayB);
        case "Add":
            return this.mergeAdd(pixelArrayA, pixelArrayB);
        case "Subtract":
            return this.mergeSubtract(pixelArrayA, pixelArrayB);
    }
    
    return pixelArrayA;
}

MergeNode.prototype.resizePixelArray = function (pixelArray, widthsrc, heightsrc, widthdst, heightdst) {
    let trimmedArray = new Uint8Array(widthdst * heightdst * 4);
    trimmedArray.fill(0);

    var yOffset = Math.round((heightdst - heightsrc) / 2);
    var xOffset = Math.round((widthdst - widthsrc) / 2);

    for (let y = 0; y < heightsrc; y++) {
        for(let x = 0 ; x < widthsrc; x++) {
            let srcIndex = (y * widthsrc + x) * 4
            let targetIndex = ((y + yOffset) * widthdst + x + xOffset) * 4
            if (targetIndex >= 0 && targetIndex < trimmedArray.length && 0 <= (x + xOffset) && (x + xOffset) < widthdst) {
                trimmedArray[targetIndex] = pixelArray[srcIndex]
                trimmedArray[targetIndex + 1] = pixelArray[srcIndex + 1]
                trimmedArray[targetIndex + 2] = pixelArray[srcIndex + 2]
                trimmedArray[targetIndex + 3] = pixelArray[srcIndex + 3]
            }
        }
    }

    return trimmedArray;
}

MergeNode.prototype.onExecute = function () {
    var inputA = this.getInputData(0);
    var inputB = this.getInputData(1);

    var outWidth = 720;
    var outHeight = 360;

    if(this.bounds.value == "A") {
        if (inputA !== null && inputA !== undefined && inputA.data.length > 0) {
            outWidth = inputA.width;
            outHeight = inputA.height;
        } else if (inputB !== null && inputB !== undefined && inputB.data.length > 0) {
            outWidth = inputB.width;
            outHeight = inputB.height;
        }
    } else {
        if (inputB !== null && inputB !== undefined && inputB.data.length > 0) {
            outWidth = inputB.width;
            outHeight = inputB.height;
        }
        else if (inputA !== null && inputA !== undefined && inputA.data.length > 0) {
            outWidth = inputA.width;
            outHeight = inputA.height;
        }       
    }

    var processingArrayA = new Uint8Array(outWidth * outHeight * 4);
    var processingArrayB = new Uint8Array(outWidth * outHeight * 4);

    //TRIM INPUT B SIZE
    if (inputB !== null && inputB !== undefined && inputB.data.length > 0) {
        if(inputB.width !== outWidth || inputB.height !== outHeight) {
            processingArrayB = this.resizePixelArray(inputB.data, inputB.width, inputB.height, outWidth, outHeight)
        } else {
            processingArrayB = inputB.data
        }
    }

    //TRIM INPUT A SIZE
    if(inputA !== null && inputA !== undefined && inputA.data.length > 0) {
        if (inputA.width !== outWidth || inputA.height !== outHeight) {
            processingArrayA = this.resizePixelArray(inputA.data, inputA.width, inputA.height, outWidth, outHeight)
        } else {
            processingArrayA = inputA.data
        }
    }

    //SET OUTPUT CANVAS SIZE
    this.outCanvas.width = outWidth
    this.outCanvas.height = outHeight
    var mergedPixelArray = this.outCanvasCtx.createImageData(outWidth, outHeight);

    //MERGE OPERATION
    if (inputA !== null && inputA !== undefined && inputA.data.length > 0) {
        if (inputB !== null && inputB !== undefined && inputB.data.length > 0) {
            var mergeresult = this.doMerge(processingArrayA, processingArrayB);
            for(let i = 0; i< mergedPixelArray.data.length; i+=4) {
                mergedPixelArray.data[i] = mergeresult[i];
                mergedPixelArray.data[i + 1] = mergeresult[i + 1];
                mergedPixelArray.data[i + 2] = mergeresult[i + 2];
                mergedPixelArray.data[i + 3] = mergeresult[i + 3];
            }
        } else {
            for (let i = 0; i < mergedPixelArray.data.length; i += 4) {
                mergedPixelArray.data[i] = processingArrayA[i];
                mergedPixelArray.data[i + 1] = processingArrayA[i + 1];
                mergedPixelArray.data[i + 2] = processingArrayA[i + 2];
                mergedPixelArray.data[i + 3] = processingArrayA[i + 3];
            }
        }
    } else if (inputB !== null && inputB !== undefined && inputB.data.length > 0) {
        for (let i = 0; i < mergedPixelArray.data.length; i += 4) {
            mergedPixelArray.data[i] = processingArrayB[i];
            mergedPixelArray.data[i + 1] = processingArrayB[i + 1];
            mergedPixelArray.data[i + 2] = processingArrayB[i + 2];
            mergedPixelArray.data[i + 3] = processingArrayB[i + 3];
        }
    }



    this.setOutputData(0, mergedPixelArray);
}
