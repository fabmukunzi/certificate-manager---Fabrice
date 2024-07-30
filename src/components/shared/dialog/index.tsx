import useClickOutside from '@/utils/hooks/useClickOutside';
import { FC, useEffect } from 'react';

interface DialogProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Dialog: FC<DialogProps> = ({ isOpen, children, onClose }) => {
  const dialogRef = useClickOutside<HTMLDialogElement>(onClose);
  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (isOpen) {
      dialogElement?.showModal();
    } else {
      dialogElement?.close();
    }
  }, [isOpen, dialogRef]);

  return (
    <dialog aria-labelledby="search supplier" aria-modal="true" ref={dialogRef}>
      {children}
    </dialog>
  );
};

export default Dialog;
