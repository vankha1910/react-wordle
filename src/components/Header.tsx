import { Settings, CircleHelp, ChartArea } from 'lucide-react';

import { useDialog } from './dialog/useDialog';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const Header = () => {
  const { showWelcomeDialog, showResultDialog, showSettingDialog } =
    useDialog();
  const { gameStatus } = useSelector((state: RootState) => state.game);
  useEffect(() => {
    if (gameStatus === 'won' || gameStatus === 'lost') {
      const timer = setTimeout(() => {
        showResultDialog();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [gameStatus]);
  return (
    <nav className='flex justify-between items-center border-b-white border-b-2  w-full py-2 px-8 mb-4'>
      <span className='w-12'></span>
      <h1 className='text-2xl font-bold'>Wordle</h1>
      <div className='flex gap-4'>
        <button onClick={showWelcomeDialog} aria-label='Help'>
          <CircleHelp className='' />
        </button>
        <button onClick={showResultDialog}>
          <ChartArea className='' aria-label='Stats' />
        </button>
        <button onClick={showSettingDialog} aria-label='Settings'>
          <Settings />
        </button>
      </div>
    </nav>
  );
};

export default Header;
