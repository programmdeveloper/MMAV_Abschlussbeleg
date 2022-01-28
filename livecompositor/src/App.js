import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';
import NodeGraph from './Components/NodeGraph';
import OutputView from './Components/OutputView';
import RecordComponent from './Components/RecordComponent';
import AudioExternalControl from "./Components/AudioExternalControl";

export var REDRAWOUT = false;
export var GRAPHWIDTH = 0.5;
export var OUTHEIGHT = 0.5;

function App() {

    React.useEffect(() => {
        console.log(document.getElementById("Menu").clientHeight);

        function handleResize() {
            var outputView = document.getElementById("main-output-view");
            var graph = document.getElementById("node-graph-canvas");

            outputView.width = Math.floor(document.body.clientWidth * (1-GRAPHWIDTH));
            outputView.height = window.innerHeight * (OUTHEIGHT) - 4;
            graph.width = Math.floor(document.body.clientWidth * GRAPHWIDTH);
            graph.height = document.getElementById("App-interface-output").clientHeight - 4;
            graph.dispatchEvent(new Event('mousemove'));
        }

        window.addEventListener('resize', handleResize)
        handleResize();

    }, [""])

  return (
    <div className="App">
          <div className="App">

              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h2>Livecompositor</h2>
              </header>

              <div className='App-interface'>
                  <NodeGraph />
                  <div className='App-interface-output' id="App-interface-output">
                      <OutputView id="OutputView"/>
                      {/* <h1>Mischpult</h1> */}
                      <div className='Menu' id="Menu">
                          <div className='Border'>
                              <AudioExternalControl />
                          </div>
                          
                          <div className='BorderR'>
                              <RecordComponent />
                          </div>
                      </div>
                  </div>
              </div>

              <footer className="App-footer">
                  <p>Im Ramen des Abschlussbelegs Audio- und Videotechnik</p>
              </footer>
          </div>
    </div>
  );
}

export default App;
