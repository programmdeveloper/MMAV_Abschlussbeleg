import React, {useEffect, useState} from 'react'
import audioMixingInstance from '../AudioMixingController'

const AudioExternalControl = () => {

    return (
        <div>
            <button id="playButton" onClick={() => audioMixingInstance.playExternal()}>Play</button>
            <button id="pauseButton" onClick={() => audioMixingInstance.pauseExternal()}>Pause</button>
            <div id="volume">
                <input defaultValue="1" id="externalVolume" type="range" min="0" max="2" step="0.01" onChange={() => audioMixingInstance.adaptExternalVolume(document.getElementById('externalVolume').value)}/>
                <input defaultValue="1" id="nodeVolume" type="range" min="0" max="2" step="0.01" onChange={() => audioMixingInstance.adaptNodeVolume(document.getElementById('nodeVolume').value)}/>
                <input defaultValue="1" id="allVolume" type="range" min="0" max="2" step="0.01" onChange={() => audioMixingInstance.adaptAllVolume(document.getElementById('allVolume').value)}/>
            </div>
            <input defaultValue="1" id="speed" type="range" min="0.5" max="2" step="0.01" onChange={() => audioMixingInstance.adaptSpeed(document.getElementById('speed').value)}/>
            <input type="checkbox" id="muteExternal" onChange={() => audioMixingInstance.muteExternal(document.getElementById('externalVolume').value)}/>
            <label htmlFor="externalAudio">Mute external Audio</label>
            <input type="checkbox" id="muteNode" onChange={() => audioMixingInstance.muteNode(document.getElementById('nodeVolume').value)}/>
            <label htmlFor="externalAudio">Mute Node Audio</label>
        </div>
    )
}

export default AudioExternalControl
