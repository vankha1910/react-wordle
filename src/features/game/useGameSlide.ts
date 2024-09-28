import { useDispatch } from 'react-redux';
import {
  addChar,
  checkRow,
  removeChar,
  clearErrorMessage,
  playNext,
  playAgain,
  hideWelcomeDialog,
  toggleDarkMode,
  toggleGameMode,
  resetGame,
} from './gameSlide';

const useGameSlide = () => {
  const dispatch = useDispatch();
  return {
    handleAddChar: (char: string) => dispatch(addChar(char)),
    handleRemoveChar: () => dispatch(removeChar()),
    handleCheckRow: () => dispatch(checkRow()),
    clearErrorMessage: () => dispatch(clearErrorMessage()),
    handlePlayNext: () => dispatch(playNext()),
    handlePlayAgain: () => dispatch(playAgain()),
    handleHideWelcomeDialog: () => dispatch(hideWelcomeDialog()),
    handleToggleDarkMode: () => dispatch(toggleDarkMode()),
    handleToggleGameMode: () => dispatch(toggleGameMode()),
    handleResetGame: () => dispatch(resetGame()),
  };
};
export default useGameSlide;
