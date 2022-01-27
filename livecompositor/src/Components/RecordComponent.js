import React from 'react'
import recorder from '../Recorder';

const RecordComponent = () => {
    return (
        <div id="record-section" className ="Record">
            <h2>Record</h2>
            <label for="fps">fps: </label>
            <input type="number" id="fps" name="fps" min="1" max="120" defaultValue="25" onChange={() => { recorder.setFramerate(document.getElementById('fps').value) }} /><br/>
            <button type="button" id="start-record-btn" className="ButtonR" onClick={() => { try {recorder.startRecord() } catch(e) {alert(e)} }}>Record</button><br />
            <button type="button" id="stop-record-btn" className="ButtonR" onClick={() => { recorder.stopRecord() }}>Stop</button><br />
            <button type="button" id="download-button" className="ButtonR" onClick={() => { try { recorder.download() } catch (e) { alert(e) } }} >Download Record</button><br />
        </div>
    )
}

export default RecordComponent
