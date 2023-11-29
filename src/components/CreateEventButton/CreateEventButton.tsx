import { FC } from 'react';
import clsx from 'clsx';
import './style.scss';

interface CreateEventButtonProps {
  handleOpenForm: () => void;
}

export const CreateEventButton: FC<CreateEventButtonProps> = ({ handleOpenForm }) => {
  return (
    <button onClick={handleOpenForm} className={clsx('create-event-button')}>
      <span className={clsx('create-event-button__plus')}>+</span>
    </button>
  );
};
