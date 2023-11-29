import { useRef } from 'react';
import clsx from 'clsx';
import { ArrowButtonsControl } from './ArrowButtonsControl/ArrowButtonsControl';
import { CalendarButton } from './CalendarButton/CalendarButton';
import { DatePickerModal } from './DatePickerModal/DatePickerModal';
import { useModal } from 'shared/hooks/useModal';
import './style.scss';

export const DatePicker = () => {
  const { open, isOpen, close } = useModal();
  const datePickerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={datePickerRef} className={clsx('date-picker')}>
      <ArrowButtonsControl handleOpenModal={open} />
      <CalendarButton handleOpenModal={open} />
      <DatePickerModal anchorEl={datePickerRef.current} isOpen={isOpen} handleClose={close} />
    </div>
  );
};
