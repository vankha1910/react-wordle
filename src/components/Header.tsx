import { FaRegQuestionCircle, FaChartLine } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';

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
        <button onClick={showWelcomeDialog}>
          <FaRegQuestionCircle className='' />
        </button>
        <button onClick={showResultDialog}>
          <FaChartLine className='' />
        </button>
        <button onClick={showSettingDialog}>
          <IoSettingsSharp className='' />
        </button>
      </div>
    </nav>
  );
};

export default Header;
