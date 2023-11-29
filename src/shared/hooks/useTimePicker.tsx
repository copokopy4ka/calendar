import { UseTimePickerResponse } from 'core/types/custom-hooks.type';
import { useCallback, useState } from 'react';

/**
 * Custom hook for managing time selection in a time picker component.
 *
 * @param {() => void} handleClose - A callback function to be called when the time selection is confirmed.
 * @returns {{
 *  - time: string | null,
 *  - hour: string | null,
 *  - minute: string | null,
 *  - handlePickHour: (hour: string) => void,
 *  - handlePickMinute: (minute: string) => void,
 *  - handleConfirm: () => void
 * }} An object containing the current time, hour, minute, and handler functions.
 */
export const useTimePicker = (handleClose: () => void): UseTimePickerResponse => {
  const [hour, setHour] = useState<string | null>(null);
  const [minute, setMinute] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const handlePickHour = useCallback((hour: string) => {
    setHour(hour);
  }, []);

  const handlePickMinute = useCallback((minute: string) => {
    setMinute(minute);
  }, []);

  const handleConfirm = useCallback(() => {
    let res = '00:00';
    if (hour && !minute) res = `${hour}:00`;
    if (!hour && minute) res = `00:${minute}`;
    if (hour && minute) res = `${hour}:${minute}`;

    setTime(res);
    handleClose();
  }, [handleClose, hour, minute]);

  return { time, hour, minute, handlePickHour, handlePickMinute, handleConfirm };
};
