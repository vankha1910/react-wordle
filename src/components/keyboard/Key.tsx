import { CellType } from '../../types/game.type';
import { specialKeys } from '../../utils/constants';
import useGameSlide from '../../features/game/useGameSlide';

const Key = ({ char, obj }: { char: string; obj?: CellType | null }) => {
  const { handleAddChar, handleCheckRow, handleRemoveChar } = useGameSlide();
  const statusClass = {
    empty: '',
    correct: 'correct',
    present: 'present',
    absent: 'absent',
    filled: '',
  };
  if (char === '') return <div className='flex-[0.5]'></div>;
  const handleClick = () => {
    if (char === '⏎') {
      handleCheckRow();
    } else if (char === '⌫') {
      handleRemoveChar();
    } else {
      handleAddChar(char);
    }
  };
  return (
    <button
      className={`${
        specialKeys.includes(char) ? 'flex-[1.5]' : ''
      } flex-1 custom-key h-12 flex items-center justify-center uppercase rounded font-bold ${
        obj?.status && statusClass[obj?.status]
      }`}
      onClick={handleClick}
    >
      {char}
    </button>
  );
};

export default Key;
