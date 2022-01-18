import React, {useState} from "react";
import './App.css';
import NodeGraph from './Components/NodeGraph';
import OutputView from './Components/OutputView';
import AudioExternalControl from "./Components/AudioExternalControl";

function App() {
  return (
    <div className="App">
        <NodeGraph />
        <OutputView />
        <AudioExternalControl/>
    </div>
  );
}

export default App;
