import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import useGameSlide from '../../../features/game/useGameSlide';
import { useDialog } from '../useDialog';
import { BarChart2, Award, Zap, Trophy } from 'lucide-react';
interface StatProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

const ResultDialog = () => {
  const { closeDialog } = useDialog();
  const { gameStats, gameStatus, secretWord, currentRowIndex } = useSelector(
    (state: RootState) => state.game
  );
  const { handlePlayNext, handlePlayAgain, handleResetGame } = useGameSlide();

  const playNext = () => {
    if (gameStatus !== 'won') return;
    handlePlayNext();
    setTimeout(() => {
      closeDialog();
    }, 200);
  };
  const playAgain = () => {
    // if (gameStatus !== 'lost') return;
    handlePlayAgain();
    setTimeout(() => {
      closeDialog();
    }, 200);
  };

  const resetGame = () => {
    handleResetGame();
    setTimeout(() => {
      closeDialog();
    }, 200);
  };
  return (
    <div className='flex flex-col items-center '>
      {gameStatus === 'won' && (
        <>
          <h2 className='text-xl mb-2 font-bold'>Congratulations!</h2>
          <h3 className='text-base font-semibold uppercase p-2'>{`You guessed "${secretWord}" in ${
            currentRowIndex + 1
          } guesses`}</h3>
        </>
      )}
      {gameStatus === 'lost' && (
        <>
          <h2 className='text-xl mb-2 font-bold'>Game over!</h2>
          <h3 className='text-base font-semibold uppercase p-2'>{`You didn't guess "${secretWord}"`}</h3>
        </>
      )}
      {gameStatus === 'inProgress' && (
        <>
          <h2 className='text-xl mb-2 font-bold'>Keep going!</h2>
        </>
      )}
      <hr className='self-stretch w-full bg-[#555] h-[1px] my-1' />
      <h3 className='text-base font-semibold uppercase p-2'>Game stats</h3>
      <ul className='flex gap-4 w-full'>
        <Stat
          label='Played'
          value={gameStats.played}
          icon={<BarChart2 />}
        ></Stat>
        <Stat
          label='Win %'
          value={Math.floor((gameStats.win / gameStats.played) * 100) || 0}
          icon={<Award />}
        ></Stat>
        <Stat
          label='Current Streak'
          value={gameStats.currentStreak}
          icon={<Zap />}
        ></Stat>
        <Stat
          label='Max Streak'
          value={gameStats.maxStreak}
          icon={<Trophy />}
        ></Stat>
      </ul>

      <hr className='self-stretch w-full bg-[#555] h-[1px] mt-4 mb-2' />

      <div className='flex gap-4'>
        <button
          className='bg-primary-orange text-white px-6 py-2 rounded-full'
          onClick={resetGame}
        >
          Reset game
        </button>
        {gameStatus === 'won' && (
          <button
            className='bg-primary-green text-white px-6 py-2 rounded-full'
            onClick={playNext}
          >
            Play Next
          </button>
        )}

        {gameStatus === 'lost' && (
          <button
            className='bg-primary-green text-white  px-6 py-2 rounded-full'
            onClick={playAgain}
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

const Stat = ({ label, value, icon }: StatProps) => (
  <div className='flex flex-col items-center space-y-2 flex-1'>
    <div className='p-3 bg-[#c7c7c7] dark:bg-[#767676] rounded-full'>
      {icon}
    </div>
    <span className='text-2xl font-bold'>{value}</span>
    <span className='text-sm text-muted-foreground'>{label}</span>
  </div>
);

export default ResultDialog;
