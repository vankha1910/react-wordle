import { useSelector } from 'react-redux';
import CustomSwitch from '../../CustomSwitch';
import { RootState } from '../../../app/store';
import useGameSlide from '../../../features/game/useGameSlide';

const SettingDialog = () => {
  const { gameSettings } = useSelector((state: RootState) => state.game);
  const { handleToggleDarkMode, handleToggleGameMode } = useGameSlide();

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-xl mb-2 font-bold'>Setting</h2>
      <div className='w-full flex justify-between gap-12 items-center'>
        <div>
          <p className='text-lg'>Hard mode</p>
          <p className='text-[12px] font-light'>
            Any revealed hints must be used in subsequent guesses
          </p>
        </div>
        <CustomSwitch
          value={gameSettings.hardMode}
          onChange={handleToggleGameMode}
        ></CustomSwitch>
      </div>
      <hr className='self-stretch w-full bg-[#555] h-[1px] my-4' />
      <div className='w-full flex justify-between gap-12 items-center'>
        <div className='text-lg'>
          <p>Dark mode</p>
        </div>
        <CustomSwitch
          value={gameSettings.darkMode}
          onChange={handleToggleDarkMode}
        ></CustomSwitch>
      </div>

      <hr className='self-stretch w-full bg-[#555] h-[1px] my-4' />

      <div className='w-full flex justify-between gap-12 items-center'>
        <div>
          <p className='text-lg'>High Contrast Mode</p>
        </div>
        <CustomSwitch disabled></CustomSwitch>
      </div>

      <hr className='self-stretch w-full bg-[#555] h-[1px] my-4' />

      <div className='w-full flex justify-between gap-12 items-center'>
        <div>
          <p className='text-lg'>Onscreen Keyboard Input Only</p>
        </div>
        <CustomSwitch disabled></CustomSwitch>
      </div>

      <hr className='self-stretch w-full bg-[#555] h-[1px] my-4' />

      <div className='w-full flex justify-between gap-12 items-center'>
        <div>
          <p className='text-lg'>Feedback</p>
        </div>
        <a href='mailto:dev.vankha@gmail.com' className='underline'>
          Email
        </a>
      </div>
      <hr className='self-stretch w-full bg-[#555] h-[1px] my-4' />
      <div className='w-full flex justify-between gap-12 items-center'>
        <div>
          <p className='text-lg'>Report a Bug</p>
        </div>
        <a href='mailto:dev.vankha@gmail.com' className='underline'>
          Email
        </a>
      </div>
    </div>
  );
};

export default SettingDialog;
