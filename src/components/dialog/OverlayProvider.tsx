import { ReactNode, useEffect, useState } from 'react';
import { OverlayContext } from './context';
import Dialog from './Dialog';

const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('');
  const [currentDialog, setCurrentDialog] = useState<ReactNode | null>(null);
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(''), 2000);
      return () => clearTimeout(timeout);
    }
    return;
  }, [message]);
  const value = {
    alert: (msg: string) => setMessage(msg),
    showDialog: (dialog: ReactNode) => setCurrentDialog(dialog),
    closeDialog: () => setCurrentDialog(null),
  };
  return (
    <OverlayContext.Provider value={value}>
      <div className='relative w-screen h-screen flex flex-col'>
        {currentDialog && <Dialog target={currentDialog} />}
        {message && (
          <aside className='absolute left-0 top-10 right-0 flex justify-center z-10 '>
            <p
              className='bg-[#444] text-white p-4 rounded shadow-sm shadow-slate-50'
              aria-live='polite'
            >
              {message}
            </p>
          </aside>
        )}
        {children}
      </div>
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;
