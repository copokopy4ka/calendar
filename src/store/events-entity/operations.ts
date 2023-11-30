import { PayloadAction } from '@reduxjs/toolkit';
import { UserEvent } from 'core/types/events.type';
import { EventsState } from 'store/events-entity/events-entity.interface';

export const getEventsOperation = (state: EventsState, { payload }: PayloadAction<UserEvent[]>) => {
  state.events = payload;
};

export const getEventByIdOperation = (state: EventsState, { payload }: PayloadAction<UserEvent | null>) => {
  if (payload) {
    state.currentEvent = payload;
  } else {
    state.errorMessage = 'Not found';
  }
};

export const createEventOperation = (
  state: EventsState,
  { payload }: PayloadAction<{ newEvent: UserEvent; updatedEvents: UserEvent[] }>
) => {
  state.currentEvent = payload.newEvent;
  state.events = payload.updatedEvents;
};

export const createEventDataBaseOperation = (state: EventsState, { payload }: PayloadAction<UserEvent>) => {
  state.currentEvent = payload;
  state.events = [...state.events, payload];
};

export const updateEventOperation = (
  state: EventsState,
  { payload }: PayloadAction<{ updatedEvent: UserEvent; updatedEvents: UserEvent[] } | null>
) => {
  if (payload) {
    state.currentEvent = payload.updatedEvent;
    state.events = payload.updatedEvents;
  } else {
    state.errorMessage = 'Not found';
  }
};

export const updateEventDataBaseOperation = (state: EventsState, { payload }: PayloadAction<UserEvent>) => {
  state.currentEvent = payload;
  state.events = state.events.map((item) => (item.id === payload.id ? payload : item));
};

export const deleteEventOperation = (state: EventsState, { payload }: PayloadAction<UserEvent[] | null>) => {
  if (payload) {
    state.events = payload;
  } else {
    state.errorMessage = 'Not found';
  }
};

export const deleteEventDataBaseOperation = (state: EventsState, { payload }: PayloadAction<string>) => {
  state.events = state.events.filter((item) => item.id !== payload);
};

export const updateDateOperation = (state: EventsState, { payload }: PayloadAction<string>) => {
  state.currentDate = payload;
};
