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
  const { handleAddChar, handleRemoveChar, handleCheckRow, clearErrorMessage } =
    useGameSlide();
  const { errorMessage } = useSelector((state: RootState) => state.game);
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
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, clearErrorMessage]);
  return (
    <>
      <Header></Header>
      <main className='flex flex-col items-center gap-4'>
        <Grid></Grid>
        <Keyboard></Keyboard>
      </main>
    </>
  );
};

export default Game;
