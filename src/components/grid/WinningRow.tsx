import { useSelector } from 'react-redux';
import { Row } from '../../types/game.type';
import Cell from './Cell';
import { RootState } from '../../app/store';

const WinningRow = ({ row, index }: { row: Row; index: number }) => {
  const { errorMessage, currentRowIndex } = useSelector(
    (state: RootState) => state.game
  );
  const showAnimation = currentRowIndex === index && errorMessage !== '';

  return (
    <div className={`flex gap-1 ${showAnimation ? 'animation-jiggle' : ''}`}>
      {row.map((cell, index) => (
        <Cell cell={cell} key={index}></Cell>
      ))}
    </div>
  );
};

export default WinningRow;
