export interface UserEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserEventDto {
  title: string;
  description?: string;
  date: string;
  time?: string;
}

export type UpdateUserEventDto = CreateUserEventDto & { id: string };

export interface UserEventFormDefaultValues {
  title: string;
  description: string;
  date: string;
  time: string;
}
