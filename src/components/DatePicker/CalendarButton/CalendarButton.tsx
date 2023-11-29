import { ReactComponent as CalendarIcon } from 'assets/calendar-icon.svg';
import clsx from 'clsx';
import './style.scss';
import { FC } from 'react';

interface CalendarButtonProps {
  handleOpenModal: () => void;
}

export const CalendarButton: FC<CalendarButtonProps> = ({ handleOpenModal }) => {
  return (
    <button className={clsx('calendar-button')} onClick={handleOpenModal}>
      <CalendarIcon />
    </button>
  );
};
