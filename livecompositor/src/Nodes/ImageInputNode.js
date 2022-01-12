import audioContextProvider from "../AudioContextProvider";

export function ImageInputNode() {
    this.addOutput("Out", "array");
    this.addOutput("Audio", "audioElement");
    this.video = null;
    this.prevUrl = "";

    this.audioCtx = audioContextProvider.getAudioContext();
    this.audio = null

    //WIDGETS
    this.url = this.addWidget("text", "URL", "");
    this.play = this.addWidget("button", "Play/Pause", "", this.playClicked.bind(this))
    //this.play = this.addWidget("button", "Play/Pause", "")
    this.loop = this.addWidget("toggle", "Loop")
    this.speed = this.addWidget("slider", "Speed", 1, function () {}, {min: 0, max: 4})
}

ImageInputNode.title = "Image Input";

ImageInputNode.prototype.onAction = function (action, data) {
    if (this.button_was_clicked)
        console.log("BUTTON CLICKED")
}

ImageInputNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
    if (this.flags.collapsed)
        return;
    ctx.save();
    ctx.fillStyle = "#ffcc00";
    ctx.fillRect(0, 0, this.size[0], this.size[1]);
    ctx.restore();
}

ImageInputNode.prototype.playClicked = function () {
    try {
        if (this.video.paused || this.video.ended) {
            this.video.play();
            console.log("PLAY");
        } else {
            this.video.pause();
            console.log("PAUSE");
        }
    } catch {
        console.log("NO VIDEO SPECIFIED");
    }
}


ImageInputNode.prototype.onRemoved = function () {
    try {
        this.video.pause();
        this.video.remove();
    } catch {
        ;
    }
    this.video = null;
}


ImageInputNode.prototype.onExecute = function () {
    if(this.video == null && this.url.value != this.prevUrl) {
        this.video = document.createElement('video');
        this.video.src = this.url.value;
        //this.video.type = "type=video/mp4";
        this.video.muted = false;
        this.prevUrl = this.url.value;
        this.video.load();
        this.audio = this.audioCtx.createMediaElementSource(this.video);
    }

    if(this.video != null) {
        let tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = this.video.videoWidth;
        tmpCanvas.height = this.video.videoHeight;
        let tmpCanvasCtx = tmpCanvas.getContext('2d');

        this.video.playbackRate = this.speed.value;
        if(this.video.ended && this.loop.value==true) {
            this.video.play();
        }

        if(this.video.readyState > 0){
            tmpCanvasCtx.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
            var outputPixelArray = tmpCanvasCtx.getImageData(0, 0, this.video.videoWidth, this.video.videoHeight);
            this.setOutputData(0, outputPixelArray);
        }

        this.setOutputData(1, this.audio);
    }
}