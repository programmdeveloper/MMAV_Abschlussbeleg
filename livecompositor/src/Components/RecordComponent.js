import React from 'react'
import recorder from '../Recorder';

const RecordComponent = () => {
    return (
        <div>
            <button type="button" onClick={() => {recorder.startRecord()}}>Record</button>
            <button type="button" onClick={() => { recorder.stopRecord() }}>Stop</button>
        </div>
    )
}

export default RecordComponent
