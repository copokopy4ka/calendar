import { SETTINGS } from 'constants/settings';
import storage from 'core/services/localStorageService';
import { MonthActiveDay, MonthGridItem } from 'core/types/calendar.type';
import { UseMonthDaysDataResponse } from 'core/types/custom-hooks.type';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectorGetCurrentDate, selectorGetEvents } from 'store/events-entity/selectors';
import { getMonthDays, updateDaysWithEvents } from 'utils/helpers';

/**
 * A custom hook for managing calendar month days and interactions.
 *
 * This hook is responsible for handling the data related to the days in a specific
 * month. It fetches and updates the days list based on the current date and associated
 * events. It also manages the selection of a specific day.
 *
 * @returns {UseMonthDaysDataResponse} An object containing:
 * - `daysList`: An array of `MonthGridItem` representing each day in the current month.
 * - `selectedDay`: The currently selected day as `MonthActiveDay` or null if no day is selected.
 * - `handleDayClick`: A function to handle the selection of a day. It updates the selected day and saves it in local storage.
 *
 * @example
 * const { daysList, selectedDay, handleDayClick } = useMonthDaysData();
 * // Use these values and functions in a calendar component to display month days and manage day selection.
 */
export const useMonthDaysData = (): UseMonthDaysDataResponse => {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectorGetCurrentDate);
  const eventsList = useSelector(selectorGetEvents);

  const [daysList, setDaysList] = useState<MonthGridItem[]>([]);
  const [selectedDay, setSelectedDay] = useState<MonthActiveDay | null>(null);

  const handleDayClick = useCallback(
    (dayData: MonthActiveDay) => {
      storage.update(SETTINGS.SELECTED_DAY, dayData);
      setSelectedDay(dayData);
    },
    [setSelectedDay]
  );

  useEffect(() => {
    if (currentDate) {
      const { daysList, activeDay } = getMonthDays(currentDate);
      setDaysList(updateDaysWithEvents(daysList, eventsList));
      setSelectedDay(activeDay);
    }
  }, [currentDate, dispatch, eventsList]);

  return { daysList, selectedDay, handleDayClick };
};
