import { createAction, nanoid } from '@reduxjs/toolkit';
import { ActionType } from 'store/actions.types';
import storage from 'core/services/localStorageService';
import { SETTINGS } from 'constants/settings';
import { CreateUserEventDto, UpdateUserEventDto, UserEvent } from 'core/types/events.type';
import dayjs from 'dayjs';
import { DATE_FORMAT } from 'constants/date-format';

export const getEvents = createAction(ActionType.EVENTS_GET, (date: string) => {
  const events: UserEvent[] | null = storage.getData(SETTINGS.SAVED_EVENTS);
  if (events?.length) {
    const payload = events.filter(
      (item) => dayjs(item.date).format(DATE_FORMAT.MONTH_YEAR) === dayjs(date).format(DATE_FORMAT.MONTH_YEAR)
    );
    return { payload };
  }
  storage.update(SETTINGS.SAVED_EVENTS, []);
  return { payload: [] };
});

export const getEventById = createAction(ActionType.EVENTS_GET_BY_ID, (id: string) => {
  const events: UserEvent[] | null = storage.getData(SETTINGS.SAVED_EVENTS);
  const payload = events?.find((item) => item.id === id);
  if (payload) {
    return { payload };
  }
  return { payload: null };
});

export const createEvent = createAction(ActionType.EVENTS_CREATE, (eventData: CreateUserEventDto) => {
  const events: UserEvent[] | null = storage.getData(SETTINGS.SAVED_EVENTS);
  const dateNow = dayjs().format();
  const newEvent: UserEvent = {
    ...eventData,
    createdAt: dateNow,
    updatedAt: dateNow,
    id: nanoid(),
  };
  if (events?.length) {
    const updatedEvents = [...events, newEvent];
    storage.update(SETTINGS.SAVED_EVENTS, updatedEvents);
    return { payload: { newEvent, updatedEvents } };
  }
  storage.update(SETTINGS.SAVED_EVENTS, [newEvent]);
  return { payload: { newEvent, updatedEvents: [newEvent] } };
});

export const updateEvent = createAction(ActionType.EVENTS_UPDATE, (updateEventData: UpdateUserEventDto) => {
  const events: UserEvent[] | null = storage.getData(SETTINGS.SAVED_EVENTS);
  const eventToUpdate = events?.find((item) => item.id === updateEventData.id);

  if (eventToUpdate && events) {
    const updatedEvent = { ...eventToUpdate, ...updateEventData, updatedAt: dayjs().format() };
    const updatedEvents = events?.map((item) => {
      if (item.id === updateEventData.id) {
        return updatedEvent;
      }
      return item;
    });
    storage.update(SETTINGS.SAVED_EVENTS, updatedEvents);
    return { payload: { updatedEvent, updatedEvents } };
  }
  return { payload: null };
});

export const deleteEvent = createAction(ActionType.EVENTS_DELETE, (id: string) => {
  const events: UserEvent[] | null = storage.getData(SETTINGS.SAVED_EVENTS);
  const filtered = events?.filter((item) => item.id !== id);
  if (filtered) {
    storage.update(SETTINGS.SAVED_EVENTS, filtered);
    return { payload: filtered };
  }
  return { payload: null };
});

export const updateCurrentDate = createAction(ActionType.CURRENT_DATE_UPDATE, (date: string) => {
  storage.update(SETTINGS.LAST_VIEWED_DATE, date);
  return { payload: date };
});
