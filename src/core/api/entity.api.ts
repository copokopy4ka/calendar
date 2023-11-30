export const API = {
	// Calendar events
	EVENTS: '/calendar/events',
	EVENTS_CREATE: '/calendar/events/create',
	EVENTS_UPDATE: '/calendar/events/update',
	EVENTS_BY_ID: (id: string) => `/calendar/events/${id}`,
	//User
	USER_CREATE: '/calendar/user/create',
};
