import React, {useEffect, useState} from 'react'
import audioMixingInstance from '../AudioMixingController'

const AudioControl = () => {

    const adaptSpeed = () => {
        console.log("Speed");
        // check if > or < 0
        // ==0 ?
        // use audio.playback
    }

    return (
        <div>
            <button id="playButton" onClick={() => audioMixingInstance.playExternal()}>Play</button>
            <button id="pauseButton" onClick={() => audioMixingInstance.pauseExternal()}>Pause</button>
            <input id="volume" type="range" onChange={() => audioMixingInstance.adaptVolume(document.getElementById('volume').value)}/>
            <input id="speed" type="range" onChange={adaptSpeed}/>
        </div>
    )
}

export default AudioControl
