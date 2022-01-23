import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';
import NodeGraph from './Components/NodeGraph';
import OutputView from './Components/OutputView';
import RecordComponent from './Components/RecordComponent';
import AudioExternalControl from "./Components/AudioExternalControl";
import Divider from './Components/Divider';

export var WIDTH = window.innerWidth;
export var HEIGHT = window.innerHeight;
export var GRAPHWIDTH = 0.5;
export var OUTHEIGHT = 0.5;

function App() {

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [nodeGraphWidth, setNodeGraphWidth] = useState(50);
    const [outputViewHeight, setOutputViewHeight] = useState(50);

    React.useEffect(() => {

        function handleResize() {
            WIDTH = window.innerWidth;
            HEIGHT = window.innerHeight;
        }

        window.addEventListener('resize', handleResize)

    }, [""])

  return (
    <div className="App">
          <div className="App">

              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h2>Abschlussbeleg</h2>
              </header>

              <div className='App-interface'>
                  <NodeGraph width={width} height={height}/>
                  <Divider vertical={true} />
                  <div className='App-interface-output'>
                      <OutputView width={width} height={height}/>
                      <Divider vertical={false} />
                      <div className='Menu'>
                          <AudioExternalControl />
                          <RecordComponent />
                      </div>
                  </div>
              </div>

              <footer className="App-footer">
                  <p>Im Ramen des Abschlussbelegs Audio und Video</p>
              </footer>
          </div>
    </div>
  );
}

export default App;
