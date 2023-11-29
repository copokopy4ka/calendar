import { FC } from 'react';
import clsx from 'clsx';
import { UserEvent } from 'core/types/events.type';
import { EventItem } from '../EventItem/EventItem';
import { MonthGridItem } from 'core/types/calendar.type';

interface EventsListProps {
  dayData: MonthGridItem;
  handleEventClick: (userEvent: UserEvent) => void;
}

export const EventList: FC<EventsListProps> = ({ dayData, handleEventClick }) => {
  return (
    <div className={clsx('days-grid__events')}>
      {dayData.events.map((item) => (
        <EventItem
          key={item.id}
          userEvent={item}
          handleClick={handleEventClick}
          isDisabled={!dayData.isCurrentMonthDay}
        />
      ))}
    </div>
  );
};
