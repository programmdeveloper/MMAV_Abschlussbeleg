export function WebcamInputNode() {
  this.addOutput("Out", "array");

  this.camvideo = document.createElement("video");
  this.camvideo.autoplay = true;
  this.stream_ready = false;

  this.tmpcanvas = null;
  this.tmpcanvasctx = null;
}

WebcamInputNode.title = "Webcam Input";

WebcamInputNode.prototype.startStream = function () {
  var camvideo = this.camvideo;
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        if ("srcObject" in camvideo) {
          camvideo.srcObject = stream;
        } else {
          camvideo.src = window.URL.createObjectURL(stream);
        }
      })
      .catch(function (error) {
        console.log("Something went wrong!");
        console.log(error);
      });
  }

  this.camvideo.onloadedmetadata = function (e) {
    this.camvideo.width = this.camvideo.videoWidth;
    this.camvideo.height = this.camvideo.videoHeight;
    this.tmpcanvas.width = this.camvideo.videoWidth;
    this.tmpcanvas.height = this.camvideo.videoHeight;
    this.stream_ready = true;
  }.bind(this);
};

WebcamInputNode.prototype.stopStream = function () {
  var stream = this.camvideo.srcObject;
  if (stream != null) {
    var tracks = stream.getTracks();
    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      track.stop();
    }
  }
  this.camvideo.srcObject = null;
  this.stream_ready = false;
};

WebcamInputNode.prototype.onRemoved = function () {
  this.stopStream();
};

WebcamInputNode.prototype.onAdded = function () {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia() not supported.");
    return;
  }
  this.startStream();

  this.tmpcanvas = document.createElement("canvas");
  this.tmpcanvasctx = this.tmpcanvas.getContext("2d");
};

WebcamInputNode.prototype.onExecute = function () {
  if (this.camvideo.readyState > 0 && this.tmpcanvasctx != null && this.stream_ready) {
    this.tmpcanvasctx.drawImage(
      this.camvideo,
      0,
      0,
      this.camvideo.videoWidth,
      this.camvideo.videoHeight
    );
    var outputPixelArray = this.tmpcanvasctx.getImageData(
      0,
      0,
      this.camvideo.videoWidth,
      this.camvideo.videoHeight
    );
    this.setOutputData(0, outputPixelArray);
  }
};
