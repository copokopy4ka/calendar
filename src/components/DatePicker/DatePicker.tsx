import { useCallback, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButtonsControl } from './ArrowButtonsControl/ArrowButtonsControl';
import { CalendarButton } from './CalendarButton/CalendarButton';
import { DatePickerModal } from './DatePickerModal/DatePickerModal';
import { useModal } from 'shared/hooks/useModal';
import './style.scss';
import { SETTINGS } from 'constants/settings';
import storage from 'core/services/localStorageService';
import dayjs from 'dayjs';
import { updateCurrentDate } from 'store/events-entity/actions';
import { useDispatch } from 'react-redux';

export const DatePicker = () => {
  const dispatch = useDispatch();
  const { open, isOpen, close } = useModal();
  const datePickerRef = useRef<HTMLDivElement>(null);

  const handleDisplayToday = useCallback(() => {
    storage.remove(SETTINGS.SELECTED_DAY);
    const today = dayjs().format();
    dispatch(updateCurrentDate(today));
  }, [dispatch]);

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
