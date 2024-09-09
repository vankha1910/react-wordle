import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import useGameSlide from '../../../features/game/useGameSlide';
import { useDialog } from '../useDialog';

const ResultDialog = () => {
  const { closeDialog } = useDialog();
  const { gameStats, gameStatus, secretWord, currentRowIndex } = useSelector(
    (state: RootState) => state.game
  );
  const { handlePlayNext, handlePlayAgain } = useGameSlide();

  const playNext = () => {
    if (gameStatus !== 'won') return;
    handlePlayNext();
    setTimeout(() => {
      closeDialog();
    }, 200);
  };
  const playAgain = () => {
    if (gameStatus !== 'lost') return;
    handlePlayAgain();
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
      <h3 className='text-base font-semibold uppercase p-2'>Statistics</h3>
      <ul className='flex gap-4 '>
        <li className='flex flex-col text-center'>
          Played <p className='text-lg mt-1 font-bold'>{gameStats.played}</p>
        </li>
        <li className='flex flex-col text-center'>
          Win %{' '}
          <p className='text-lg mt-1 font-bold'>
            {Math.floor((gameStats.win / gameStats.played) * 100) || 0}
          </p>
        </li>
        <li className='flex flex-col text-center'>
          Current Streak
          <p className='text-lg mt-1 font-bold'>{gameStats.currentStreak}</p>
        </li>
        <li className='flex flex-col text-center'>
          Max Streak
          <p className='text-lg mt-1 font-bold'>{gameStats.maxStreak}</p>
        </li>
      </ul>
      <hr className='self-stretch w-full bg-[#555] h-[1px] mt-4 mb-2' />
      {gameStatus === 'won' && (
        <button
          className='bg-primary-green text-white p-2 rounded-lg'
          onClick={playNext}
        >
          Play Next
        </button>
      )}
      {gameStatus === 'lost' && (
        <button
          className='bg-primary-green text-white p-2 rounded-lg'
          onClick={playAgain}
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default ResultDialog;
