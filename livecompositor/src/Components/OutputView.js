import React, {useEffect, useState} from 'react'

export var ZOOMFACTOR = 0.5;
export var OFFSET_X = 0;
export var OFFSET_Y = 0;

const OutputView = ( {width, height}) => {

    const [dragOn, setDragOn] = useState(false);
    const [startDragX, setStartDragX] = useState(0);
    const [startDragY, setStartDragY] = useState(0);
    const [currentDragX, setCurrentDragX] = useState(0);
    const [currentDragY, setCurrentDragY] = useState(0);

    const clearOutput = () => {
        var canvas = document.getElementById('main-output-view');
        canvas.getContext('2d').fillStyle = "black"
        canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height);
    }

    useEffect(() => {
        if (dragOn) {
            OFFSET_X = currentDragX-startDragX
            OFFSET_Y = currentDragY-startDragY
        }
    }, [dragOn]);

    useEffect(() => {
        clearOutput()
        let canvas = document.getElementById('main-output-view');
        canvas.onwheel = function (event) {
            //clearOutput()
            event.preventDefault();
            if (event.wheelDelta > 0) {
                ZOOMFACTOR *= 1.1
            } else {
                ZOOMFACTOR *= 0.9
            }
        };

        canvas.onmousewheel = function (event) {
            //clearOutput()
            event.preventDefault();
            if(event.wheelDelta > 0) {
                ZOOMFACTOR *= 1.1
            } else {
                ZOOMFACTOR *= 0.9
            }
        };

        canvas.onmousedown = function (event) {
            var startX = event.clientX;
            var startY = event.clientY;
            var prevOffsetX = OFFSET_X;
            var prevOffsetY = OFFSET_Y;
            window.onmousemove = function (event) {
                //console.log("X: " + event)
                OFFSET_X = prevOffsetX + event.clientX - startX;
                OFFSET_Y = prevOffsetY + event.clientY - startY;
            }
        }

        window.onmouseup = function() {
            window.onmousemove = function (event) {
                ;
            }
        }

    }, [""]);

    return (
        <div id='Mainoutputview' className='Mainoutputview'>
            <canvas id="main-output-view" className="main-output-view" height={window.innerHeight / 2} width={window.innerWidth / 2} ></canvas>
        </div>
    )
}

export default OutputView
