import { CellType } from '../../types/game.type';

const Cell = ({
  cell,
  className,
  style,
}: {
  cell: CellType;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const statusClass = {
    empty: 'empty',
    correct: 'correct text-t-color',
    present: 'present text-t-color',
    absent: 'absent text-t-color',
    filled: 'filled animation',
  };
  return (
    <div
      className={`${statusClass[cell.status]} ${
        className ? className : ''
      }  custom-cell w-12 h-12 flex items-center justify-center text-xl font-bold uppercase transition-transform duration-200`}
      style={style}
    >
      {cell.char}
    </div>
  );
};

// const EmptyCell = ({ cell }: { cell: string }) => {
//   return <div className='bg-white w-12 h-12 border-2 border-gray-400'></div>;
// };

export default Cell;
