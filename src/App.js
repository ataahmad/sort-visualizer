import './App.css';
import BarGraph from './Components/BarGraph';

const pjson = require('../package.json');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Sorting Visualizer v{pjson.version}
      </header>
      <BarGraph/>
    </div>
  );
}

export default App;
