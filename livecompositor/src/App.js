import logo from './logo.svg';
import './App.css';
import NodeGraph from './Components/NodeGraph';
import OutputView from './Components/OutputView';
import AudioControl from "./Components/AudioControl";

function App() {
  return (
    <div className="App">
      <NodeGraph />
      <OutputView />
        <AudioControl/>
    </div>
  );
}

export default App;
