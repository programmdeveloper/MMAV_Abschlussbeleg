import audioContextProvider from "../AudioContextProvider";
import NodeRegisterInstance from '../NodeRegister';

export function ImageInputNode() {
    this.addOutput("Out", "array");
    this.addOutput("Audio", "audioElement");

    var LiteGraph = NodeRegisterInstance.getLiteGraph();
    this.addInput("Play", LiteGraph.ACTION);

    this.video = null;
    this.prevUrl = "";

    this.audioCtx = audioContextProvider.getAudioContext();
    this.audio = null

    //WIDGETS
    this.upload = this.addWidget("button", "Upload", "", this.uploadClicked.bind(this))
    this.url = this.addWidget("text", "URL", "");
    this.play = this.addWidget("button", "Play/Pause", "", this.playClicked.bind(this))
    //this.play = this.addWidget("button", "Play/Pause", "")
    this.loop = this.addWidget("toggle", "Loop")
    this.speed = this.addWidget("slider", "Speed", 1, function () {}, {min: 0, max: 4})
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

ImageInputNode.prototype.handleUpload = function (event) {
  var file = event.target.files[0];

  if (file.type.startsWith("video/")) {
    this.url.value = URL.createObjectURL(file);
  } else {
    this.url.value = "";
    alert("Invalid Filetype.");
  }
}

ImageInputNode.prototype.uploadClicked = function () {
  var filebrowser = document.createElement("input");
  filebrowser.setAttribute("type", "file");
  filebrowser.setAttribute("accept", "video/*");
  filebrowser.addEventListener("change", this.handleUpload.bind(this), false);
  filebrowser.click();
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
};

ImageInputNode.prototype.onAction = function(action, data)
{
  if (action == "Play") {
    this.playClicked()
  }

}

ImageInputNode.prototype.onRemoved = function () {
  try {
    this.video.pause();
    this.video.remove();
  } catch {}
  this.video = null;
};

ImageInputNode.prototype.onExecute = function () {
    if(this.url.value != this.prevUrl) {
      this.video = document.createElement('video');
      if(this.url.value != "") {
          this.video.src = this.url.value;
          this.video.muted = false;
          this.video.load();
          this.audio = this.audioCtx.createMediaElementSource(this.video);
      }
      this.prevUrl = this.url.value;
    }

  if (this.video != null) {
    let tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = this.video.videoWidth;
    tmpCanvas.height = this.video.videoHeight;
    let tmpCanvasCtx = tmpCanvas.getContext("2d");

    this.video.playbackRate = this.speed.value;
    if (this.video.ended && this.loop.value == true) {
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
