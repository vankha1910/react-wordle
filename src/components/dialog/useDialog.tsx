import { useOverlay } from './context';
import ResultDialog from './dial/ResultDialog';
import SettingDialog from './dial/SettingDialog';
import WelcomeDialog from './dial/WelcomeDialog';

export function useDialog() {
  const { showDialog, closeDialog, alert } = useOverlay();

  const showWelcomeDialog = () => showDialog(<WelcomeDialog />);
  const showResultDialog = () => showDialog(<ResultDialog />);
  const showSettingDialog = () => showDialog(<SettingDialog />);
  const showMessage = (message: string) => alert(message);

  return {
    showWelcomeDialog,
    showResultDialog,
    showSettingDialog,
    closeDialog,
    showMessage,
  };
}
