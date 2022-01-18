class Recorder {
    constructor() {
        if (!Recorder._instance) {
            this.canvasToRecord = null;
            this.recording = false;
            this.framerate = 25;
            this.mediaRecorder = undefined;
            this.recordedChunks = [];
            this.blobUrl = null;
            Recorder._instance = this;
        }
        return Recorder._instance;
    }

    setFramerate(framerate) {
        if(framerate < 0 || framerate > 250) {
            throw "Invalid Framerate"
        }
        this.framerate = framerate;
    }

    setCanvasToRecord(canvas) {
        this.canvasToRecord = canvas;
    }

    _recorderHandledataAvailable(event) {
        if (event.data && event.data.size > 0) {
            this.recordedChunks.push(event.data);
        }
    }

    _recorderHandleStop(event) {
        const superBuffer = new Blob(this.recordedChunks, { type: 'video/mp4' });
        this.blobUrl = window.URL.createObjectURL(superBuffer);
    }

    startRecord() {
        if(this.canvasToRecord === null) {
            throw "No active output node."
        }

        if(this.recording === false) {
            this.recording = true;
            var stream = this.canvasToRecord.captureStream(this.framerate)

            let options = {
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 7500000,
                mimeType: 'video/webm' 
            };

            this.recordedChunks = [];

            try {
                this.mediaRecorder = new MediaRecorder(stream, options);
            } catch (e0) {
                console.log('Unable to create MediaRecorder with options Object: ', e0);
                try {
                    options = { mimeType: 'video/webm,codecs=vp9' };
                    this.mediaRecorder = new MediaRecorder(stream, options);
                } catch (e1) {
                    console.log('Unable to create MediaRecorder with options Object: ', e1);
                    try {
                        options = 'video/vp8'; // Chrome 47
                        this.mediaRecorder = new MediaRecorder(stream, options);
                    } catch (e2) {
                        alert('MediaRecorder is not supported by this browser.\n\n' +
                            'Try Firefox 29 or later, or Chrome 47 or later, ' +
                            'with Enable experimental Web Platform features enabled from chrome://flags.');
                        console.error('Exception while creating MediaRecorder:', e2);
                        return;
                    }
                }
            }

            this.mediaRecorder.onstop = this._recorderHandleStop.bind(this);
            this.mediaRecorder.ondataavailable = this._recorderHandledataAvailable.bind(this);
            this.mediaRecorder.start()
        }
    }
    
    stopRecord() {
        this.recording = false;
        try {
            this.mediaRecorder.stop()
        } catch {
            ;
        }
    }

    download() {
        if(this.recordedChunks.length === 0) {
            throw "No records to download."
        }
        var link = document.createElement("a");
        link.href = this.blobUrl;
        link.download = "video.webm";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

}

const instance = new Recorder();
//Object.freeze(instance);

export default instance;