import { createSlice } from '@reduxjs/toolkit';
import { EventsState } from './events-entity.interface';
import {
  updateDateOperation,
  getEventsOperation,
  getEventByIdOperation,
  updateEventOperation,
  createEventOperation,
  deleteEventOperation,
} from './operations';
import { updateCurrentDate, getEvents, getEventById, createEvent, updateEvent, deleteEvent } from './actions';

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
      // get by id
      .addCase(getEventById, getEventByIdOperation)
      // create
      .addCase(createEvent, createEventOperation)
      // update
      .addCase(updateEvent, updateEventOperation)
      // delete
      .addCase(deleteEvent, deleteEventOperation);
  },
});

export default eventsStore.reducer;
