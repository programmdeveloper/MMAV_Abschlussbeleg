import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';
import NodeGraph from './Components/NodeGraph';
import OutputView from './Components/OutputView';
import RecordComponent from './Components/RecordComponent';
import AudioExternalControl from "./Components/AudioExternalControl";
import Divider from './Components/Divider';

export var REDRAWOUT = false;
export var GRAPHWIDTH = 0.5;
export var OUTHEIGHT = 0.5;

function App() {

    React.useEffect(() => {

        function handleResize() {
            var outputView = document.getElementById("main-output-view");
            var outputViewContext = outputView.getContext("2d");
            var graph = document.getElementById("node-graph-canvas");
            var graphContext = graph.getContext("2d");

            outputView.width = document.body.offsetWidth * (1-GRAPHWIDTH) - 3;
            outputView.height = window.innerHeight * (OUTHEIGHT);
            graph.width = document.body.offsetWidth * GRAPHWIDTH - 3;
            graph.height = document.documentElement.clientHeight - 90;
            graph.dispatchEvent(new Event('mousemove'));
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
                  <NodeGraph />
                  <Divider vertical={true} />
                  <div className='App-interface-output'>
                      <OutputView />
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
