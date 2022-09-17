import Game from './components/Game';
import './App.css'
import { ListProvider } from './components/Context/BoardContext';
function App() {
  return (
    <div className="App">
      <ListProvider>
        <Game />
      </ListProvider>
    </div>
  );
}

export default App;
