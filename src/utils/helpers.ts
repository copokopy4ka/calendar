import { DATE_FORMAT } from 'constants/date-format';
import { MonthActiveDay, MonthGridItem } from 'core/types/calendar.type';
import { UserEvent } from 'core/types/events.type';
import { nanoid } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';
import storage from 'core/services/localStorageService';
import { SETTINGS } from 'constants/settings';

/**
 * Creates a grid item for a specific date within a calendar month view.
 *
 * @param {Dayjs} itemDate - The date to be represented by the grid item. This is a Dayjs object.
 * @param {boolean} isCurrentMonthDay - Indicates whether the `itemDate` falls within the current month.
 *                                      `true` if it's in the current month, `false` otherwise.
 * @returns {MonthGridItem} An object representing a day cell in the calendar grid. This object includes
 *                          the date in string format, the numerical day of the month, the name of the day
 *                          of the week, an empty array for events, a flag indicating if it's a day of the
 *                          current month, and a unique identifier.
 */
const createMonthGridItem = (itemDate: Dayjs, isCurrentMonthDay: boolean): MonthGridItem => {
  return {
    date: itemDate.format(),
    dateNum: itemDate.get('date'),
    weekDayName: itemDate.format(DATE_FORMAT.WEEK_DAY),
    events: [],
    isCurrentMonthDay,
    id: nanoid(),
  };
};

/**
 * Determines and handles the currently active day within a given month.
 *
 * @param {MonthGridItem[]} currentMonthDays - An array of MonthGridItem objects, each representing a day in the current month.
 * @returns {MonthActiveDay} An object representing the currently active day. This includes the unique identifier and date string of the active day.
 *
 * This function first attempts to retrieve a previously selected day from  local storage.
 * If no saved day is found, it defaults to the current day if it's in the current month, or the first day of the month otherwise.
 * If a saved day is found and it's within the current month, that day is set as the active day.
 * Otherwise, the first day of the current month is set as the active day.
 * In cases where the active day is adjusted (not a saved day), the new active day is also updated in storage.
 */
const handleCurrentActiveDay = (currentMonthDays: MonthGridItem[]): MonthActiveDay => {
  const savedCurrentDay: MonthActiveDay | null = storage.getData(SETTINGS.SELECTED_DAY);
  const today = dayjs();

  if (!savedCurrentDay) {
    const currentDayGridItem =
      currentMonthDays.find((item) => dayjs(item.date).isSame(today, 'day')) || currentMonthDays[0];
    const res = { id: currentDayGridItem.id, date: currentDayGridItem.date };
    storage.update(SETTINGS.SELECTED_DAY, res);
    return res;
  } else if (dayjs(currentMonthDays[0].date).isSame(savedCurrentDay.date, 'month')) {
    const savedDayGridItem = currentMonthDays[dayjs(savedCurrentDay.date).get('date') - 1] || currentMonthDays[0];
    return { id: savedDayGridItem.id, date: savedDayGridItem.date };
  } else {
    const { id, date } = currentMonthDays[0];
    storage.update(SETTINGS.SELECTED_DAY, { id, date });
    return { id, date };
  }
};

/**
 * Updates an array of day objects with user events.
 *
 * This function iterates over each day in the provided array of `days` and
 * filters the `userEvents` to find events that occur on the same day.
 * If events are found for a day, they are added to that day object.
 *
 * @param {MonthGridItem[]} days - An array of day objects to be updated.
 * @param {UserEvent[]} userEvents - An array of user events to be matched with days.
 * @returns {MonthGridItem[]} The array of day objects, each potentially augmented with a `events` property containing the day's events.
 */
export const updateDaysWithEvents = (days: MonthGridItem[], userEvents: UserEvent[]): MonthGridItem[] =>
  days.map((day) => {
    const dayEvents = userEvents.filter(
      (item) => dayjs(item.date).format(DATE_FORMAT.DATE) === dayjs(day.date).format(DATE_FORMAT.DATE)
    );
    if (dayEvents.length) {
      return {
        ...day,
        events: dayEvents,
      };
    }
    return day;
  });

/**
 * Generates a list of days for the month based on the provided date, including days from the previous and next month to fill the week.
 *
 * @param {string} date - The date string used to determine the month for which the days should be generated.
 * @returns An object containing two fields:
 *   - `daysList`: an array of `MonthGridItem` objects representing each day in the month grid, including trailing days from the previous and next months.
 *   - `activeDay`: an object of type `MonthActiveDay` representing the currently active day based on certain criteria.
 *
 * Each `MonthGridItem` represents a day and contains relevant information such as the date and whether it belongs to the current month.
 * The function calculates the first and last day of the month and iteratively fills the `daysList` array.
 * It also handles days from the previous month if the month does not start on a Monday, and days from the next month if the month does not end on a Sunday.
 */
export const getMonthDays = (date: string): { daysList: MonthGridItem[]; activeDay: MonthActiveDay } => {
  const firstDayOfMonth = dayjs(date).startOf('month');
  const lastDayOfMonth = dayjs(date).endOf('month');
  const currentMonthDays: MonthGridItem[] = [createMonthGridItem(firstDayOfMonth, true)];

  let currentDay = firstDayOfMonth;
  while (currentDay.get('date') < lastDayOfMonth.get('date')) {
    currentDay = currentDay.add(1, 'day');
    currentMonthDays.push(createMonthGridItem(currentDay, true));
  }
  const activeDay = handleCurrentActiveDay(currentMonthDays);

  if (firstDayOfMonth.get('day') !== 1) {
    let prevMonthDay = dayjs(date).subtract(1, 'month').endOf('month');
    do {
      currentMonthDays.unshift(createMonthGridItem(prevMonthDay, false));
      prevMonthDay = prevMonthDay.subtract(1, 'day');
    } while (prevMonthDay.get('day') > 0);
  }

  if (lastDayOfMonth.get('day') !== 0) {
    let nextMonthDay = dayjs(date).add(1, 'month').startOf('month');
    currentMonthDays.push(createMonthGridItem(nextMonthDay, false));
    while (nextMonthDay.get('day') > 0) {
      nextMonthDay = nextMonthDay.add(1, 'day');
      currentMonthDays.push(createMonthGridItem(nextMonthDay, false));
    }
  }

  return { daysList: currentMonthDays, activeDay };
};

/**
 * Validates if a given input string is a valid representation of time in HH:MM format.
 *
 * @param {string} input - The input string to be validated as a time format.
 * @returns {boolean} - Returns `true` if the input is a valid time format, otherwise `false`.
 *
 * The function checks the following criteria for a valid time:
 *   - The length of the input string should not exceed 5 characters.
 *   - The first character must be a digit between '0' and '2'.
 *   - The second character depends on the first character:
 *     - If the first character is '2', the second character must be between '0' and '3'.
 *     - Otherwise, it can be any digit between '0' and '9'.
 *   - The third character must be a colon ':'.
 *   - The fourth character must be a digit between '0' and '5'.
 *   - The fifth character must be a digit between '0' and '9'.
 *
 * If any of these conditions are not met, the function returns `false`.
 */
export const isValidTimeInput = (input: string): boolean => {
  if (input.length > 5) {
    return false;
  }

  for (let i = 0; i < input.length; i++) {
    const c = input[i];

    switch (i) {
      case 0:
        if (c < '0' || c > '2') return false;
        break;
      case 1:
        if (input[0] === '2') {
          if (c < '0' || c > '3') return false;
        } else {
          if (c < '0' || c > '9') return false;
        }
        break;
      case 2:
        if (c !== ':') return false;
        break;
      case 3:
        if (c < '0' || c > '5') return false;
        break;
      case 4:
        if (c < '0' || c > '9') return false;
        break;
      default:
        break;
    }
  }

  return true;
};

/**
 * Formats a given date string into the 'DD-MM-YYYY' format (format for IMask input value).
 *
 * @param {string} date - The date string to be formatted.
 * @returns {string} - The date formatted in 'DD-MM-YYYY' format.
 *
 * This function uses the `dayjs` library to format the provided date string.
 * It takes an input string that represents a date, and converts it into a standardized format of 'DD-MM-YYYY'.
 * This is useful for ensuring consistent date formats across an application, particularly for display or input fields.
 */
export const formateDateForInputMasked = (date: string): string => dayjs(date).format(DATE_FORMAT.DAY_MONTH_YEAR);

/**
 * Formats a date string, optionally with time, into a standardized date format.
 *
 * @param {string} value - The date string to be formatted. Expected in either 'YYYY-MM-DD' or 'DD.MM.YYYY' format.
 * @param {string} [time] - Optional time string to be appended to the date, in 'HH:mm' format.
 * @returns {string} - The formatted date string, conforming to the ISO 8601 standard format.
 *
 * This function takes a date string and an optional time string. It adjusts the format of the date string
 * to be consistent, handling two common formats: 'YYYY-MM-DD' and 'DD.MM.YYYY'. If a time string is provided,
 * it appends the time to the date. The function then uses the `dayjs` library to format the combined date and time
 * into the ISO 8601 standard format.
 *
 * Note: If the date format is not in the expected formats, the function's behavior may be unpredictable.
 */
export const formateInputDateValue = (value: string, time?: string) => {
  let changedDate: string | Dayjs = value.split('-').reverse().join('-');
  if (changedDate.includes('.')) {
    changedDate = changedDate.split('.').reverse().join('-');
  }

  if (time) {
    changedDate = `${changedDate} ${time}`;
  }

  return dayjs(changedDate).format();
};
