import { FC } from 'react';
import clsx from 'clsx';
import { DatePicker } from 'components/DatePicker/DatePicker';
import { CreateEventButton } from 'components/CreateEventButton/CreateEventButton';
import './style.scss';

interface HeaderProps {
  handleOpenForm: () => void;
}

export const Header: FC<HeaderProps> = ({ handleOpenForm }) => {
  return (
    <header className={clsx('header')}>
      <CreateEventButton handleOpenForm={handleOpenForm} />
      <DatePicker />
    </header>
  );
};
