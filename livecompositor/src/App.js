import React, {useState} from "react";
import './App.css';
import NodeGraph from './Components/NodeGraph';
import OutputView from './Components/OutputView';
import RecordComponent from './Components/RecordComponent';
import AudioExternalControl from "./Components/AudioExternalControl";

function App() {
  return (
    <div className="App">

      <NodeGraph />
      <OutputView />
      <AudioExternalControl/>
      <RecordComponent />
    </div>
  );
}

export default App;
