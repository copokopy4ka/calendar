import { SETTINGS } from 'constants/settings';
import storage from 'core/services/localStorageService';
import { MonthActiveDay, MonthGridItem } from 'core/types/calendar.type';
import { UseMonthDaysDataResponse } from 'core/types/custom-hooks.type';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectorGetCurrentDate, selectorGetEvents } from 'store/events-entity/selectors';
import { getMonthDays, updateDaysWithEvents } from 'utils/helpers';

/**
 * Custom hook for managing monthly calendar data.
 *
 * This hook facilitates the management of calendar days within a specific month,
 * including the retrieval and updating of days based on the current date and
 * events. It also manages the state of the currently selected day.
 *
 * @returns {UseMonthDaysDataResponse} An object containing:
 * - daysList: Array of MonthGridItem, representing the days in the current month.
 * - selectedDay: The currently selected day of the month (MonthActiveDay) or null if no day is selected.
 * - handleDayClick: A function to handle the selection of a day.
 *
 * @remarks
 * - The hook uses the `useSelector` hook to access the current date and events list from the Redux store.
 * - The `useState` hook is used to manage the state of the days list and the selected day.
 * - The `useEffect` hook is used to update the days list and the selected day when the current date or events list changes.
 */
export const useMonthDaysData = (): UseMonthDaysDataResponse => {
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
  }, [currentDate, eventsList]);

  return { daysList, selectedDay, handleDayClick };
};
