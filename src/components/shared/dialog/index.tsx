import { FC, useEffect, useRef, useCallback } from 'react';

interface DialogProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Dialog: FC<DialogProps> = ({ isOpen, children, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (dialogRef.current && dialogRef.current === event.target) {
        onClose();
      }
    },
    [onClose],
  );
  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (isOpen) {
      dialogElement?.showModal();
      dialogElement?.addEventListener('click', handleOutsideClick);
    } else {
      dialogElement?.close();
      dialogElement?.removeEventListener('click', handleOutsideClick);
    }
    return () => {
      dialogElement?.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, handleOutsideClick]);

  return <dialog ref={dialogRef}>{children}</dialog>;
};

export default Dialog;
