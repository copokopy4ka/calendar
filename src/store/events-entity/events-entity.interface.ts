import { UserEvent } from 'core/types/events.type';

export interface EventsState {
  events: UserEvent[];
  currentEvent: UserEvent;
  currentDate: string | null;
	errorMessage: string | null;
	isLoading: boolean;
}
