import { createAction, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import axios from 'core/api/axios.confg';
import { ActionType } from 'store/actions.types';
import storage from 'core/services/localStorageService';
import { SETTINGS } from 'constants/settings';
import { CreateUserEventDto, UpdateUserEventDto, UserEvent } from 'core/types/events.type';
import dayjs from 'dayjs';
import { DATE_FORMAT } from 'constants/date-format';
import { API } from 'core/api/entity.api';

// local storage
export const getEvents = createAction(ActionType.EVENTS_GET, (date: string) => {
  const currentDate = dayjs(date).format(DATE_FORMAT.MONTH_YEAR);
  const nextMonthDate = dayjs(date).add(1, 'month').format(DATE_FORMAT.MONTH_YEAR);
  const prevMonthDate = dayjs(date).subtract(1, 'month').format(DATE_FORMAT.MONTH_YEAR);
  const events: UserEvent[] | null = storage.getData(SETTINGS.SAVED_EVENTS);
  if (events?.length) {
    const payload = events.filter(
      (item) =>
        dayjs(item.date).format(DATE_FORMAT.MONTH_YEAR) === currentDate ||
        dayjs(item.date).format(DATE_FORMAT.MONTH_YEAR) === nextMonthDate ||
        dayjs(item.date).format(DATE_FORMAT.MONTH_YEAR) === prevMonthDate
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

// Current date
export const updateCurrentDate = createAction(ActionType.CURRENT_DATE_UPDATE, (date: string) => {
  storage.update(SETTINGS.LAST_VIEWED_DATE, date);
  return { payload: date };
});

// API

export const getEventsDataBase = createAsyncThunk(
  ActionType.EVENTS_DB_GET,
  async (date: string, { rejectWithValue }) => {
    try {
      const currentDate = dayjs(date).format(DATE_FORMAT.MONTH_YEAR);
      const nextMonthDate = dayjs(date).add(1, 'month').format(DATE_FORMAT.MONTH_YEAR);
      const prevMonthDate = dayjs(date).subtract(1, 'month').format(DATE_FORMAT.MONTH_YEAR);
      const { data } = await axios.get<UserEvent[]>(API.EVENTS);
      const res = data.filter(
        (item) =>
          dayjs(item.date).format(DATE_FORMAT.MONTH_YEAR) === currentDate ||
          dayjs(item.date).format(DATE_FORMAT.MONTH_YEAR) === nextMonthDate ||
          dayjs(item.date).format(DATE_FORMAT.MONTH_YEAR) === prevMonthDate
      );
      return res;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

export const getEventByIdDataBase = createAsyncThunk(
  ActionType.EVENTS_DB_GET_BY_ID,
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<UserEvent>(API.EVENTS_BY_ID(id));

      return data;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

export const createEventDataBase = createAsyncThunk(
  ActionType.EVENTS_DB_CREATE,
  async (eventData: CreateUserEventDto, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<UserEvent>(API.EVENTS_CREATE, eventData);

      return data;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

export const updateEventDataBase = createAsyncThunk(
  ActionType.EVENTS_DB_UPDATE,
  async (updateEventData: UpdateUserEventDto, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<UserEvent>(API.EVENTS_UPDATE, updateEventData);

      return data;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

export const deleteEventDataBase = createAsyncThunk(
  ActionType.EVENTS_DB_DELETE,
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete<{ deleted: boolean }>(API.EVENTS_BY_ID(id));

      return id;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

// Create user DB
export const createUserOnDB = createAsyncThunk(
  ActionType.USER_DB_CREATE,
  async (_, { rejectWithValue }): Promise<{ msg: string }> => {
    try {
      const { data } = await axios.post<{ msg: string }>(API.USER_CREATE);

      return data;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);
