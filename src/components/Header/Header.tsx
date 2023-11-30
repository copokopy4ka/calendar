import { FC, useContext } from 'react';
import clsx from 'clsx';
import { DatePicker } from 'components/DatePicker/DatePicker';
import { CreateEventButton } from 'components/CreateEventButton/CreateEventButton';
import './style.scss';
import { MainLayoutContext } from 'layouts/MainLayout/MainLayout.context';
import { PickStorageButtons } from './PickStorageButtons/PickStorageButtons';

interface HeaderProps {
  handleOpenForm: () => void;
}

export const Header: FC<HeaderProps> = ({ handleOpenForm }) => {
  const { isUsingLocalStorage, setIsUsingLocalStorage } = useContext(MainLayoutContext);
  return (
    <header className={clsx('header')}>
      <CreateEventButton handleOpenForm={handleOpenForm} />
      <PickStorageButtons isUsingLocalStorage={isUsingLocalStorage} setIsUsingLocalStorage={setIsUsingLocalStorage} />
      <DatePicker />
    </header>
  );
};
