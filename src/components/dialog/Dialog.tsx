import { ReactNode, useEffect, useState } from 'react';
import { useOverlay } from './context';
import { X } from 'lucide-react';
const Dialog = ({ target }: { target: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const { closeDialog } = useOverlay();
  // const onClose = visible ? undefined : closeDialog;
  // const onClosing = () => setVisible(false);
  useEffect(() => {
    if (target) {
      setTimeout(() => setVisible(true), 100);
    }
  }, [target]);
  return (
    <div
      className='absolute inset-0 bg-[rgba(0,0,0,0.1)] dark:bg-[rgba(0,0,0,0.7)] flex items-center justify-center'
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.1s linear',
        zIndex: visible ? 1 : -1,
      }}
      // onTransitionEnd={onClose   }
      onClick={closeDialog}
    >
      <div
        className='dark:bg-[#444] bg-white p-4 h-auto relative max-w-[90%] z-2 rounded'
        style={{
          opacity: visible ? 1 : 0,
          translate: visible ? '0 0' : '0 20px',
          transition: 'opacity 0.3s linear, translate 0.3s linear',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          onClick={closeDialog}
          className='bg-transparent absolute right-2 top-2 cursor-pointer text-2xl '
        >
          <X />
        </div>
        {target}
      </div>
    </div>
  );
};

export default Dialog;
