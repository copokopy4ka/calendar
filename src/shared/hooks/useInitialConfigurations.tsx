import { useEffect } from 'react';
import dayjs from 'dayjs';
import storage from 'core/services/localStorageService';
import { SETTINGS } from 'constants/settings';
import { createUserOnDB, getEvents, getEventsDataBase, updateCurrentDate } from 'store/events-entity/actions';
import { useThunkDispatch } from 'shared/hooks/useThunkDispatch';
import { useSelector } from 'react-redux';
import { selectorGetIsLoading } from 'store/events-entity/selectors';

/**
 * Custom hook for initializing application configurations.
 *
 * This hook initializes the application state based on saved configurations,
 * handling the retrieval of the last viewed date and the loading of events
 * either from local storage or a database, depending on the provided flag.
 *
 * @param {boolean} isUsingLocalStorage - Flag to determine whether to fetch events
 *                                        from local storage or from a database.
 *
 * @returns {boolean} a boolean indicator of loading status for visual interaction with user.
 *
 * @remarks
 * - The hook uses the `useThunkDispatch` custom hook for dispatching Redux actions.
 * - It uses `useEffect` to perform side effects for loading the initial configurations.
 * - The hook will dispatch different actions based on the `isUsingLocalStorage` parameter
 *   to either load events from the local storage or from a database.
 * - It also ensures that the last viewed date is updated in the storage.
 */
export const useInitialConfigurations = (isUsingLocalStorage: boolean): boolean => {
  const dispatch = useThunkDispatch();
  const isLoading = useSelector(selectorGetIsLoading);

  useEffect(() => {
    const savedDate = storage.getData(SETTINGS.LAST_VIEWED_DATE);
    if (savedDate) {
      dispatch(updateCurrentDate(savedDate));
      if (isUsingLocalStorage) {
        dispatch(getEvents(savedDate));
      } else {
        dispatch(getEventsDataBase(savedDate));
      }
    } else {
      const currentDate = dayjs().format();
      storage.update(SETTINGS.LAST_VIEWED_DATE, currentDate);
      dispatch(updateCurrentDate(currentDate));
      if (isUsingLocalStorage) {
        dispatch(getEvents(currentDate));
      } else {
        dispatch(getEventsDataBase(currentDate));
      }
    }
  }, [dispatch, isUsingLocalStorage]);

  useEffect(() => {
    if (!isUsingLocalStorage) {
      dispatch(createUserOnDB());
    }
  }, [dispatch, isUsingLocalStorage]);

  return isLoading;
};
