import './App.css';
import InsertionSort from './Components/InsertionSort';

const pjson = require('../package.json');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Sorting Visualizer <small>v{pjson.version}</small>
      </header>
      <div>
        <InsertionSort />
      </div>
    </div>
  );
}

export default App;
