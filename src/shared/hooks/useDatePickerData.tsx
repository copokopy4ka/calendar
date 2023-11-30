import { SETTINGS } from 'constants/settings';
import storage from 'core/services/localStorageService';
import { UseDatePickerDataResponse } from 'core/types/custom-hooks.type';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useThunkDispatch } from 'shared/hooks/useThunkDispatch';
import { updateCurrentDate } from 'store/events-entity/actions';
import { selectorGetCurrentDate } from 'store/events-entity/selectors';

/**
 * A custom hook for managing date picker data and interactions.
 *
 * This hook handles the logic for selecting months and years in a date picker,
 * and provides functionality for toggling between month and year views. It integrates
 * with Redux for state management and updates local storage as well.
 *
 * @param {Function} handleClose - A callback function to be called when the date picker is closed.
 *
 * @returns {UseDatePickerDataReturnValue} An object containing:
 * - `isMonthsPickerActive`: A boolean state indicating whether the months picker view is active.
 * - `month`: The currently selected month (as a number) or null if no month is selected.
 * - `year`: The currently selected year (as a number) or null if no year is selected.
 * - `handleDisplayMonths`: A function to switch to the months picker view.
 * - `handleDisplayYears`: A function to switch to the years picker view.
 * - `handlePickMonth`: A function to handle the selection of a month.
 * - `handlePickYear`: A function to handle the selection of a year.
 * - `handleConfirm`: A function that invokes the `handleClose` callback.
 *
 * @example
 * const {
 *   isMonthsPickerActive,
 *   month,
 *   year,
 *   handleDisplayMonths,
 *   handleDisplayYears,
 *   handlePickMonth,
 *   handlePickYear,
 *   handleConfirm
 * } = useDatePickerData(() => console.log('DatePicker closed'));
 * // These can now be used in a date picker component to manage state and interactions.
 */
export const useDatePickerData = (handleClose: () => void): UseDatePickerDataResponse => {
  const dispatch = useThunkDispatch();
  const currentDate = useSelector(selectorGetCurrentDate);

  const [isMonthsPickerActive, setIsMonthsPickerActive] = useState(true);
  const [month, setMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);

  const handleDisplayMonths = useCallback(() => {
    setIsMonthsPickerActive(true);
  }, []);

  const handleDisplayYears = useCallback(() => {
    setIsMonthsPickerActive(false);
  }, []);

  const handlePickMonth = useCallback(
    (month: number) => {
      setMonth(month);
      if (currentDate) {
        const newDate = dayjs(currentDate).set('month', month).format();
        dispatch(updateCurrentDate(newDate));
        storage.update(SETTINGS.LAST_VIEWED_DATE, newDate);
      }
    },
    [currentDate, dispatch]
  );

  const handlePickYear = useCallback(
    (year: number) => {
      setYear(year);
      if (currentDate) {
        const newDate = dayjs(currentDate).set('year', year).format();
        dispatch(updateCurrentDate(newDate));
        storage.update(SETTINGS.LAST_VIEWED_DATE, newDate);
      }
    },
    [currentDate, dispatch]
  );

  const handleConfirm = useCallback(() => {
    handleClose();
  }, [handleClose]);

  useEffect(() => {
    if (currentDate) {
      setMonth(dayjs(currentDate).get('month'));
      setYear(dayjs(currentDate).get('year'));
    }
  }, [currentDate]);

  return {
    isMonthsPickerActive,
    handleDisplayMonths,
    handleDisplayYears,
    month,
    year,
    handlePickMonth,
    handlePickYear,
    handleConfirm,
  };
};
