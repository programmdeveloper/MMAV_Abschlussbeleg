import React, {useEffect, useState} from 'react'
import audioMixingInstance from '../AudioMixingController'

const AudioExternalControl = () => {

    return (
        <div>
            <button id="playButton" className = "Button" onClick={() => audioMixingInstance.playExternal()}>Play</button>
            <button id="pauseButton" className="Button" onClick={() => audioMixingInstance.pauseExternal()}>Pause</button>
            <div id="volume" className = "Volume">
                <input defaultValue="1" id="externalVolume" type="range" min="0" max="2" step="0.01" onChange={() => audioMixingInstance.adaptExternalVolume(document.getElementById('externalVolume').value)} />
                <label className = "Slider-beschreibung">External Volume</label>
            </div>

            <div id="volume" className="Volume">
                <input defaultValue="1" id="nodeVolume" type="range" min="0" max="2" step="0.01" onChange={() => audioMixingInstance.adaptNodeVolume(document.getElementById('nodeVolume').value)} />
                <label className="Slider-beschreibung">Node Volume</label> 
            </div>

            <div id="volume" className="Volume">
                <input defaultValue="1" id="allVolume" type="range" min="0" max="2" step="0.01" onChange={() => audioMixingInstance.adaptAllVolume(document.getElementById('allVolume').value)} />
                <label className="Slider-beschreibung">Master Volume</label>
            </div>
            
            <div className="Checkbox">
                <input type="checkbox" id="muteExternal" className= "checkbox" onChange={() => audioMixingInstance.muteExternal(document.getElementById('externalVolume').value)} />
                <label htmlFor="externalAudio">Mute external Audio</label>
                <input type="checkbox" id="muteNode" className="checkbox" onChange={() => audioMixingInstance.muteNode(document.getElementById('nodeVolume').value)} />
                <label htmlFor="externalAudio">Mute Node Audio</label>
            </div>

            <div id="volume" className="Volume">
                <input defaultValue="1" id="speed" type="range" min="0.5" max="2" step="0.01" onChange={() => audioMixingInstance.adaptSpeed(document.getElementById('speed').value)} />
                <label className="Slider-beschreibung">Speed</label>
            </div>
            
        </div>
    )
}

export default AudioExternalControl
