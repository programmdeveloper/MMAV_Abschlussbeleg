import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';
import NodeGraph from './Components/NodeGraph';
import OutputView from './Components/OutputView';
import RecordComponent from './Components/RecordComponent';
import AudioExternalControl from "./Components/AudioExternalControl";

function App() {
  return (
    <div className="App">
          <div className="App">

              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h2>Abschlussbeleg</h2>
              </header>

              <div className='App-interface'>
                  <NodeGraph />
                  <div className='App-interface-output'>
                      <OutputView />
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
