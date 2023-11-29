import { FC, useEffect, useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import clsx from 'clsx';
import { HoursList } from './HoursList/HoursList';
import { MinutesList } from './MinutesList/MinutesList';
import './style.scss';
import { useTimePicker } from 'shared/hooks/useTimePicker';

interface TimePickerModalProps {
  isOpen: boolean;
  handleClose: () => void;
  anchorEl: HTMLDivElement | null;
  handleChangeTime: (timeValue: string) => void;
}

export const TimePickerModal: FC<TimePickerModalProps> = ({ isOpen, handleClose, anchorEl, handleChangeTime }) => {
  const [anchorElementRect, setAnchorElementRect] = useState<DOMRect | null>(null);

  const { time, hour, minute, handlePickHour, handlePickMinute, handleConfirm } = useTimePicker(handleClose);

  useEffect(() => {
    if (anchorEl) {
      setAnchorElementRect(anchorEl.getBoundingClientRect());
    }
  }, [anchorEl]);

  useEffect(() => {
    if (time) {
      handleChangeTime(time);
    }
  }, [handleChangeTime, time]);

  return (
    <Modal
      id='time-picker-modal'
      isOpen={isOpen}
      handleClose={handleClose}
      backdropStyle={{ zIndex: 4, backdropFilter: 'none', background: 'transparent' }}
    >
      {anchorElementRect && (
        <div
          style={{
            bottom: anchorElementRect.height * 3,
            left: anchorElementRect.left - anchorElementRect.width / 2,
          }}
          className={clsx('time-modal-content', { open: isOpen })}
        >
          <div className={clsx('time-modal-content__lists-wrapper')}>
            <HoursList currentPickedHour={hour} handlePickHour={handlePickHour} />
            <MinutesList currentPickedMinute={minute} handlePickMinute={handlePickMinute} />
          </div>
          <button className={clsx('time-modal-content__confirm-button')} onClick={handleConfirm}>
            ok
          </button>
        </div>
      )}
    </Modal>
  );
};
