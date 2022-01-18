import React from 'react'
import recorder from '../Recorder';

const RecordComponent = () => {
    return (
        <div id="record-section">
            <h2>Record</h2><br />
            <label for="fps">fps: </label>
            <input type="number" id="fps" name="fps" min="1" max="120" defaultValue="25" onChange={() => { recorder.setFramerate(document.getElementById('fps').value) }} /><br/>
            <button type="button" id="start-record-btn" onClick={() => { try {recorder.startRecord() } catch(e) {alert(e)} }}>Record</button><br />
            <button type="button" id="stop-record-btn" onClick={() => { recorder.stopRecord() }}>Stop</button><br />
            <button type="button" id="download-button" onClick={() => { try { recorder.download() } catch (e) { alert(e) } }} >Download Record</button><br />
        </div>
    )
}

export default RecordComponent
