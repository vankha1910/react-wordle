import EmptyRow from './EmptyRow';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import WinningRow from './WinningRow';
import RevealRow from './RevealRow';
import { Row } from '../../types/game.type';

const RenderRow = ({ row, index }: { row: Row; index: number }) => {
  const { rowStates } = useSelector((state: RootState) => state.game);
  switch (rowStates[index]) {
    case 'correct':
      return <WinningRow row={row} index={index}></WinningRow>;
    case 'revealed':
      return <RevealRow row={row}></RevealRow>;
    case 'empty':
      return <EmptyRow row={row} index={index} />;
    default:
      return <EmptyRow row={row} index={index} />;
  }
};

const Grid = () => {
  const { rows } = useSelector((state: RootState) => state.game);

  return (
    <div className=' flex-1 flex flex-col  gap-1  '>
      {rows.map((row, index) => (
        <RenderRow row={row} key={index} index={index}></RenderRow>
      ))}
    </div>
  );
};

export default Grid;
