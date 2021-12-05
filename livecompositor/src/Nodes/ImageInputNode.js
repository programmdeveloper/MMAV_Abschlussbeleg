export function ImageInputNode() {
    this.addOutput("Out", "array");
    this.url = this.addWidget("text", "URL", "");
    this.video = null;
    this.prevUrl = "";

    this.tmpCanvas = document.createElement('canvas');
    this.tmpCanvas.width=640;
    this.tmpCanvas.height=320;
    this.tmpCanvas.style="visibility: hidden;";
    this.tmpCanvasCtx = this.tmpCanvas.getContext('2d');
}

ImageInputNode.title = "Image Input";

ImageInputNode.prototype.onExecute = function () {
    if(this.video == null && this.url.value != this.prevUrl) {
        this.video = document.createElement('video');
        this.video.src = this.url.value;
        this.video.type = "type=video/mp4";
        this.video.autoplay = true;
        this.video.muted = true;
        this.prevUrl = this.url.value;
        this.video.load();
        if (this.video.paused || this.video.ended) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }

    if(this.video != null) {
        if(this.video.readyState > 0){
            this.tmpCanvasCtx.drawImage(this.video,0,0, this.tmpCanvas.width, this.tmpCanvas.height);
            var outputPixelArray = this.tmpCanvasCtx.getImageData(0, 0, this.tmpCanvas.width, this.tmpCanvas.height);
            this.setOutputData(0, outputPixelArray);
        }
    }
}