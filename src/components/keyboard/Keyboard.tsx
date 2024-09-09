import { KEYBOARD_LAYOUT } from '../../utils/constants';
import Key from './Key';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { CellType, Row } from '../../types/game.type';

const Keyboard = () => {
  const { rows } = useSelector((state: RootState) => state.game);

  function findCharacter(arr: Row[], targetChar: string): CellType | null {
    let foundChar = null;

    for (let i = arr.length - 1; i >= 0; i--) {
      for (let j = arr[i].length - 1; j >= 0; j--) {
        if (arr[i][j].char === targetChar) {
          if (arr[i][j].status === 'correct') {
            return arr[i][j]; // Return immediately if 'correct' is found
          }
          foundChar = arr[i][j]; // Store the value if not 'correct'
        }
      }
    }

    return foundChar;
  }
  return (
    <div className='flex flex-col w-full gap-2 max-w-[600px] px-2'>
      {KEYBOARD_LAYOUT.map((row, i) => (
        <div className='flex gap-2 w-full' key={i}>
          {row.map((char, index) => (
            <Key obj={findCharacter(rows, char)} key={index} char={char}></Key>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
