import React, {useEffect} from 'react'

export var ZOOMFACTOR = 0.5;

const OutputView = () => {

    return (
        <div>
            <canvas id="main-output-view" width='720' height='360' onClick={() => {ZOOMFACTOR += 1}}style={{ border: '1px solid black' }}></canvas>
        </div>
    )
}

export default OutputView
