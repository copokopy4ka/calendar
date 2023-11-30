import { createSlice } from '@reduxjs/toolkit';
import { EventsState } from './events-entity.interface';
import {
  updateDateOperation,
  getEventsOperation,
  getEventByIdOperation,
  updateEventOperation,
  createEventOperation,
  deleteEventOperation,
  createEventDataBaseOperation,
  updateEventDataBaseOperation,
  deleteEventDataBaseOperation,
  pendingOperation,
} from './operations';
import {
  updateCurrentDate,
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsDataBase,
  getEventByIdDataBase,
  createEventDataBase,
  updateEventDataBase,
  deleteEventDataBase,
} from './actions';

const initialState: EventsState = {
  events: [],
  currentEvent: {
    id: '',
    title: '',
    date: '',
    createdAt: '',
    updatedAt: '',
  },
  currentDate: null,
  errorMessage: null,
  isLoading: false,
};

export const eventsStore = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //update date
      .addCase(updateCurrentDate, updateDateOperation)
      //get events
      .addCase(getEvents, getEventsOperation)
      // get event by id
      .addCase(getEventById, getEventByIdOperation)
      // create event
      .addCase(createEvent, createEventOperation)
      // update event
      .addCase(updateEvent, updateEventOperation)
      // delete event
      .addCase(deleteEvent, deleteEventOperation)
      //get events DB
      .addCase(getEventsDataBase.pending, pendingOperation)
      .addCase(getEventsDataBase.fulfilled, getEventsOperation)
      // get event by idDB
      .addCase(getEventByIdDataBase.pending, pendingOperation)
      .addCase(getEventByIdDataBase.fulfilled, getEventByIdOperation)
      // create event DB
      .addCase(createEventDataBase.pending, pendingOperation)
      .addCase(createEventDataBase.fulfilled, createEventDataBaseOperation)
      // update event DB
      .addCase(updateEventDataBase.pending, pendingOperation)
      .addCase(updateEventDataBase.fulfilled, updateEventDataBaseOperation)
      // delete event DB
      .addCase(deleteEventDataBase.pending, pendingOperation)
      .addCase(deleteEventDataBase.fulfilled, deleteEventDataBaseOperation);
  },
});

export default eventsStore.reducer;
