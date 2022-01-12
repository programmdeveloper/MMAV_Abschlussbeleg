import React, {useEffect, useState} from 'react'
import audioMixingInstance from '../AudioMixingController'

const AudioControl = () => {

    return (
        <div>
            <button id="playButton" onClick={() => audioMixingInstance.playExternal()}>Play</button>
            <button id="pauseButton" onClick={() => audioMixingInstance.pauseExternal()}>Pause</button>
            <input id="volume" type="range" min="0" max="2" step="0.01" onChange={() => audioMixingInstance.adaptVolume(document.getElementById('volume').value)}/>
            <input value="1" id="speed" type="range" min="0.5" max="2" step="0.01" onChange={() => audioMixingInstance.adaptSpeed(document.getElementById('speed').value)}/>
            <input type="checkbox" id="externalAudio" onChange={() => audioMixingInstance.externalActive()}/>
            <label htmlFor="externalAudio">external audio active</label>
        </div>
    )
}

export default AudioControl
