import { CSSProperties, FC, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import './style.scss';

interface ModalProps {
  id: string;
  isOpen: boolean;
  isNotFirstModal?: boolean;
  handleClose: () => void;
  backdropStyle?: CSSProperties;
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({ id, isOpen, handleClose, backdropStyle, children }) => {
  const [modalRoot, setModalRoot] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', id);
    document.body.appendChild(modalRoot);
    setModalRoot(modalRoot);

    return () => {
      setModalRoot(null);
      document.body.removeChild(modalRoot);
    };
  }, [id]);

  return (
    modalRoot &&
    createPortal(
      <>
        {children}
        <div onClick={handleClose} className={clsx('modal-backdrop', { open: isOpen })} style={backdropStyle} />
      </>,
      modalRoot
    )
  );
};
