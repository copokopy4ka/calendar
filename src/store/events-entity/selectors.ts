import { RootState } from '../root-store';

export const selectorGetEvents = (store: RootState) => store.eventsStore.events;

export const selectorGetEventById = (store: RootState) => store.eventsStore.currentEvent;

export const selectorGetCurrentDate = (store: RootState) => store.eventsStore.currentDate;
