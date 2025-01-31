import { useEffect } from 'react';
import Header from './Header';
import Grid from './grid/Grid';
import Keyboard from './keyboard';
import useGameSlide from '../features/game/useGameSlide';
import { isValidChar } from '../utils';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useDialog } from './dialog/useDialog';

const Game = () => {
  const { showWelcomeDialog } = useDialog();
  const {
    handleAddChar,
    handleRemoveChar,
    handleCheckRow,
    clearErrorMessage,
    handleHideWelcomeDialog,
  } = useGameSlide();
  const { errorMessage, gameSettings } = useSelector(
    (state: RootState) => state.game
  );
  const { showMessage } = useDialog();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (isValidChar(key)) {
        handleAddChar(key);
      } else if (key === 'enter') {
        // handle check
        handleCheckRow();
      } else if (key === 'backspace') {
        // handle delete
        handleRemoveChar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleAddChar, handleRemoveChar, handleCheckRow]);
  useEffect(() => {
    if (errorMessage) {
      showMessage(errorMessage);
      const timer = setTimeout(() => {
        clearErrorMessage();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, clearErrorMessage]);

  useEffect(() => {
    if (gameSettings?.showWelcomeScreen) {
      showWelcomeDialog();
      handleHideWelcomeDialog();
    }
  }, []);

  useEffect(() => {
    if (gameSettings.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [gameSettings.darkMode]);
  return (
    <>
      <Header></Header>
      <main className='flex flex-col items-center gap-4'>
        <Grid></Grid>
        <Keyboard></Keyboard>
      </main>
      <footer className='text-center mt-auto mb-2 text-sm'>
        Created by Kha &copy; 2024
      </footer>
    </>
  );
};

export default Game;
