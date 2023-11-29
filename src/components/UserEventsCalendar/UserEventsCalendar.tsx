import { CalendarGrid } from 'components/CalendarGrid/CalendarGrid';
import { Header } from 'components/Header/Header';
import { useMonthDaysData } from 'shared/hooks/useMonthDaysData';
import './style.scss';
import clsx from 'clsx';
import { UserEventFormModal } from 'components/UserEventFormModal/UserEventFormModal';
import { useHandleUserEvent } from 'shared/hooks/useHandleUserEvent';

export const UserEventsCalendar = () => {
  const { daysList, selectedDay, handleDayClick } = useMonthDaysData();
  const {
		selectedEvent,
		open,
		isOpen,
		close,
		handleEventClick,
		handleSubmitForm,
		handleDeleteEvent
	} = useHandleUserEvent();

  return (
    <div className={clsx('user-events-calendar')}>
      <Header handleOpenForm={open} />
      <CalendarGrid
        daysList={daysList}
        selectedDay={selectedDay}
        handleDayClick={handleDayClick}
        handleEventClick={handleEventClick}
      />
      {selectedDay && <UserEventFormModal
        isOpen={isOpen}
        handleClose={close}
        onSubmit={handleSubmitForm}
        userEventData={selectedEvent}
        handleDeleteEvent={handleDeleteEvent}
				selectedDay={selectedDay}
      />}
    </div>
  );
};
