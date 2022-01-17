import logo from './logo.svg';
import './App.css';
import NodeGraph from './Components/NodeGraph';
import OutputView from './Components/OutputView';
import AudioControl from "./Components/AudioControl";
import RecordComponent from './Components/RecordComponent';

function App() {
  return (
    <div className="App">
      <NodeGraph />
      <OutputView />
      <AudioControl/>
      <RecordComponent />
    </div>
  );
}

export default App;
