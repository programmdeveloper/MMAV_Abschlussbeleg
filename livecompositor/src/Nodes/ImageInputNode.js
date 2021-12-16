export function ImageInputNode() {
  this.addOutput("Out", "array");
  this.video = null;
  this.prevUrl = "";

  //WIDGETS
  this.url = this.addWidget("text", "URL", "");
  this.play = this.addWidget("button", "Play/Pause", "", this.playClicked.bind(this));
  //this.play = this.addWidget("button", "Play/Pause", "")
  this.loop = this.addWidget("toggle", "Loop");
  this.speed = this.addWidget("slider", "Speed", 1, function () {}, { min: 0, max: 4 });

  this.tmpCanvas = document.createElement("canvas");
  this.tmpCanvas.width = 640;
  this.tmpCanvas.height = 320;
  this.tmpCanvas.style = "visibility: hidden;";
  this.tmpCanvasCtx = this.tmpCanvas.getContext("2d");
}

ImageInputNode.title = "Image Input";

ImageInputNode.prototype.onAction = function (action, data) {
  if (this.button_was_clicked) console.log("BUTTON CLICKED");
};

ImageInputNode.prototype.onDrawForeground = function (ctx, graphcanvas) {
  if (this.flags.collapsed) return;
  ctx.save();
  ctx.fillStyle = "#ffcc00";
  ctx.fillRect(0, 0, this.size[0], this.size[1]);
  ctx.restore();
};

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
};

ImageInputNode.prototype.onRemoved = function () {
  try {
    this.video.pause();
    this.video.remove();
  } catch {}
  this.video = null;
};

ImageInputNode.prototype.onExecute = function () {
  if (this.video == null && this.url.value !== this.prevUrl) {
    this.video = document.createElement("video");
    this.video.src = this.url.value;
    this.video.type = "type=video/mp4";
    this.video.muted = true;
    this.prevUrl = this.url.value;
    this.video.load();
  }

  if (this.video != null) {
    this.video.playbackRate = this.speed.value;
    if (this.video.ended && this.loop.value === true) {
      this.video.play();
    }

    if (this.video.readyState > 0) {
      this.tmpCanvasCtx.drawImage(this.video, 0, 0, this.tmpCanvas.width, this.tmpCanvas.height);
      var outputPixelArray = this.tmpCanvasCtx.getImageData(
        0,
        0,
        this.tmpCanvas.width,
        this.tmpCanvas.height
      );
      this.setOutputData(0, outputPixelArray);
    }
  }
};
