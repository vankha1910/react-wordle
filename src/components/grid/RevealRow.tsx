import { Row } from '../../types/game.type';
import Cell from './Cell';
import { useEffect, useState } from 'react';

const RevealRow = ({ row }: { row: Row }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    if (counter < row.length) {
      const timeout = setTimeout(() => {
        setActiveIndex(counter);
        setCounter(counter + 1);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [counter, row.length]);

  return (
    <div className={`flex gap-1`}>
      {row.map((cell, index) => (
        <Cell
          showAnimation={activeIndex === index}
          cell={cell}
          key={index}
          className={`reveal-row ${
            activeIndex === index
              ? 'animate-flip-in'
              : activeIndex > index
              ? 'animate-flip-out'
              : ''
          }`}
          style={{
            animationDelay: `${index * 300}ms`,
          }}
        ></Cell>
      ))}
    </div>
  );
};

export default RevealRow;
