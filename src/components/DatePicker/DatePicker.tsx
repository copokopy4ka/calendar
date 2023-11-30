import { useCallback, useContext, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButtonsControl } from './ArrowButtonsControl/ArrowButtonsControl';
import { CalendarButton } from './CalendarButton/CalendarButton';
import { DatePickerModal } from './DatePickerModal/DatePickerModal';
import { useModal } from 'shared/hooks/useModal';
import './style.scss';
import { SETTINGS } from 'constants/settings';
import storage from 'core/services/localStorageService';
import dayjs from 'dayjs';
import { getEvents, getEventsDataBase, updateCurrentDate } from 'store/events-entity/actions';
import { useThunkDispatch } from 'shared/hooks/useThunkDispatch';
import { MainLayoutContext } from 'layouts/MainLayout/MainLayout.context';

export const DatePicker = () => {
  const { isUsingLocalStorage } = useContext(MainLayoutContext);
  const dispatch = useThunkDispatch();
  const { open, isOpen, close } = useModal();
  const datePickerRef = useRef<HTMLDivElement>(null);

  const handleDisplayToday = useCallback(() => {
    storage.remove(SETTINGS.SELECTED_DAY);
    const today = dayjs().format();
    dispatch(updateCurrentDate(today));
    if (isUsingLocalStorage) {
      dispatch(getEvents(today));
    } else {
      dispatch(getEventsDataBase(today));
    }
  }, [dispatch, isUsingLocalStorage]);

  return (
    <div ref={datePickerRef} className={clsx('date-picker')}>
      <button type='button' onClick={handleDisplayToday} className={clsx('date-picker__display-today-button')}>
        Show current date
      </button>
      <ArrowButtonsControl handleOpenModal={open} />
      <CalendarButton handleOpenModal={open} />
      {isOpen && <DatePickerModal anchorEl={datePickerRef.current} isOpen={isOpen} handleClose={close} />}
    </div>
  );
};
