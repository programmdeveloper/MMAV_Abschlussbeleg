import React, {useEffect, useState} from 'react'

const AudioControl = () => {
    let audioCtx = new AudioContext();
    let out = audioCtx.destination;

    const audio = new Audio("example.wav");
    const source = audioCtx.createMediaElementSource(audio);
    source.connect(out);

    const adaptVolume = () => {
        console.log("Volume");
        // create gain node like in boombox example
    }

    const adaptSpeed = () => {
        console.log("Speed");
        // check if > or < 0
        // ==0 ?
        // use audio.playback
    }

    return (
        <div>
            <button id="playButton" onClick={() => source.start()}>Play</button>
            <button id="pauseButton" onClick={() => source.stop()}>Pause</button>
            <input id="volume" type="range" onChange={adaptVolume}/>
            <input id="speed" type="range" onChange={adaptSpeed}/>
        </div>
    )
}

export default AudioControl
