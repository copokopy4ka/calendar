import { useCallback, useContext, useMemo } from 'react';
import dayjs from 'dayjs';
import storage from 'core/services/localStorageService';
import { SETTINGS } from 'constants/settings';
import { DATE_FORMAT } from 'constants/date-format';
import { useSelector } from 'react-redux';
import { selectorGetCurrentDate } from 'store/events-entity/selectors';
import { getEvents, getEventsDataBase, updateCurrentDate } from 'store/events-entity/actions';
import { UseArrowButtonsControlResponse } from 'core/types/custom-hooks.type';
import { useThunkDispatch } from 'shared/hooks/useThunkDispatch';
import { MainLayoutContext } from 'layouts/MainLayout/MainLayout.context';

/**
 * A custom hook for controlling arrow button navigation in a date context.
 *
 * This hook provides functionality for navigating between months and formatting
 * the current date. It uses Redux for state management and `dayjs` for date manipulation.
 *
 * @returns {object} An object containing:
 * - `dateText`: A string representing the current date formatted as month and year.
 * - `handlePrevButtonClick`: A function to handle the action of the previous button click, which
 *   updates the current date to the previous month and saves the new date in local storage.
 * - `handleNextButtonClick`: A function to handle the action of the next button click, which
 *   updates the current date to the next month and saves the new date in local storage.
 *
 * @example
 * const { dateText, handlePrevButtonClick, handleNextButtonClick } = useArrowButtonsControl();
 * // You can now use these in your component to display the date and control the navigation.
 */
export const useArrowButtonsControl = (): UseArrowButtonsControlResponse => {
  const { isUsingLocalStorage } = useContext(MainLayoutContext);
  const dispatch = useThunkDispatch();
  const currentDate = useSelector(selectorGetCurrentDate);

  const dateText = useMemo(() => dayjs(currentDate).format(DATE_FORMAT.MONTH_YEAR), [currentDate]);

  const handleNextButtonClick = useCallback(async () => {
    if (currentDate) {
      const newDate = dayjs(currentDate).add(1, 'month').format();
      dispatch(updateCurrentDate(newDate));
      if (isUsingLocalStorage) {
        dispatch(getEvents(newDate));
      } else {
        await dispatch(getEventsDataBase(newDate));
      }
      storage.update(SETTINGS.LAST_VIEWED_DATE, newDate);
    }
  }, [currentDate, dispatch, isUsingLocalStorage]);

  const handlePrevButtonClick = useCallback(async () => {
    if (currentDate) {
      const newDate = dayjs(currentDate).subtract(1, 'month').format();
      dispatch(updateCurrentDate(newDate));
      if (isUsingLocalStorage) {
        dispatch(getEvents(newDate));
      } else {
        await dispatch(getEventsDataBase(newDate));
      }
      storage.update(SETTINGS.LAST_VIEWED_DATE, newDate);
    }
  }, [currentDate, dispatch, isUsingLocalStorage]);

  return {
    dateText,
    handlePrevButtonClick,
    handleNextButtonClick,
  };
};
