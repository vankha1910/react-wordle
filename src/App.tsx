import './App.css';
import { Provider } from 'react-redux';
import store from './app/store';
import Game from './components/Game';
import OverlayProvider from './components/dialog/OverlayProvider';
function App() {
  return (
    <Provider store={store}>
      <OverlayProvider>
        <Game></Game>
      </OverlayProvider>
    </Provider>
  );
}

export default App;
