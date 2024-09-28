import { Row } from '../../types/game.type';
import Cell from './Cell';
import { useEffect, useState } from 'react';

const RevealRow = ({ row }: { row: Row }) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    if (counter <= row.length) {
      const timeout = setTimeout(() => {
        setActiveIndex(counter);
        setCounter(counter + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [counter, row.length]);

  return (
    <div className={`flex gap-1`}>
      {row.map((cell, index) => (
        <Cell
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
            animationDelay: `${index * 150}ms`,
          }}
        ></Cell>
      ))}
    </div>
  );
};

export default RevealRow;
