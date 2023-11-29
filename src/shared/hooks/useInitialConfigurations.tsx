import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import storage from 'core/services/localStorageService';
import { SETTINGS } from 'constants/settings';
import { getEvents, updateCurrentDate } from 'store/events-entity/actions';

/**
 * A custom hook for initializing application configurations on load.
 *
 * This hook is used to set up initial settings when the application loads. It checks
 * for a saved date in local storage and dispatches actions to update the current date
 * and fetch events based on this date. If no saved date is found, it sets the current
 * date to today's date and updates this in both the Redux store and local storage.
 *
 * No parameters are required for this hook.
 *
 * @example
 * useInitialConfigurations();
 * // Use this hook in a component or a page to initialize date settings on load.
 */
export const useInitialConfigurations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedDate = storage.getData(SETTINGS.LAST_VIEWED_DATE);
    if (savedDate) {
      dispatch(updateCurrentDate(savedDate));
      dispatch(getEvents(savedDate));
    } else {
      const currentDate = dayjs().format();
      storage.update(SETTINGS.LAST_VIEWED_DATE, currentDate);
      dispatch(updateCurrentDate(currentDate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
