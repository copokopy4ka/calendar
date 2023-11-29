import { FC, useEffect, useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import clsx from 'clsx';
import { MonthsList } from './MonthsList/MonthsList';
import './style.scss';
import { YearsList } from 'components/DatePicker/DatePickerModal/YearsList/YearsList';
import { useDatePickerData } from 'shared/hooks/useDatePickerData';

interface DatePickerModalProps {
  isOpen: boolean;
  handleClose: () => void;
  anchorEl: HTMLDivElement | null;
}

export const DatePickerModal: FC<DatePickerModalProps> = ({ isOpen, handleClose, anchorEl }) => {
  const [anchorElementRect, setAnchorElementRect] = useState<DOMRect | null>(null);

  const {
    isMonthsPickerActive,
    handleDisplayMonths,
    handleDisplayYears,
    month,
    year,
    handlePickMonth,
    handlePickYear,
    handleConfirm,
  } = useDatePickerData(handleClose);

  useEffect(() => {
    if (anchorEl) {
      setAnchorElementRect(anchorEl.getBoundingClientRect());
    }
  }, [anchorEl]);

  return (
    <Modal id='date-picker-modal' isOpen={isOpen} handleClose={handleClose}>
      {anchorElementRect && (
        <div
          style={{
            top: anchorElementRect.bottom + 10,
            left: anchorElementRect.left - anchorElementRect.width / 2,
            width: anchorElementRect.width * 1.5,
          }}
          className={clsx('modal-content', { open: isOpen })}
        >
          <div className={clsx('modal-content__arrow-buttons-wrapper')}>
            <button
              className={clsx('modal-content__arrow-button', { active: isMonthsPickerActive })}
              onClick={handleDisplayMonths}
            >
              Month
            </button>
            <button
              className={clsx('modal-content__arrow-button', { active: !isMonthsPickerActive })}
              onClick={handleDisplayYears}
            >
              Year
            </button>
          </div>
          {isMonthsPickerActive ? (
            <MonthsList currentPickedMonth={month} handlePickMonth={handlePickMonth} />
          ) : (
            <YearsList currentPickedYear={year} handlePickYear={handlePickYear} />
          )}
          <button className={clsx('modal-content__confirm-button')} onClick={handleConfirm}>
            OK
          </button>
        </div>
      )}
    </Modal>
  );
};
