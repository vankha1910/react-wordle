import { useDispatch } from 'react-redux';
import {
  addChar,
  checkRow,
  removeChar,
  clearErrorMessage,
  playNext,
  playAgain,
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
  };
};
export default useGameSlide;
