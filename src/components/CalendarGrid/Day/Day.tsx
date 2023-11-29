import { FC, useCallback } from 'react';
import clsx from 'clsx';
import { MonthActiveDay, MonthGridItem } from 'core/types/calendar.type';
import { EventList } from 'components/CalendarGrid/Day/EventsList/EventsList';
import { UserEvent } from 'core/types/events.type';

interface DayProps {
  dayData: MonthGridItem;
  handleDayClick: (data: MonthActiveDay) => void;
  activeDay: MonthActiveDay | null;
  handleEventClick: (userEvent: UserEvent) => void;
}

export const Day: FC<DayProps> = ({ dayData, handleDayClick, activeDay, handleEventClick }) => {
  const handleClick = useCallback(
    () => handleDayClick({ id: dayData.id, date: dayData.date }),
    [dayData, handleDayClick]
  );
  return (
    <div
      onClick={handleClick}
      className={clsx('days-grid__day', { disabled: !dayData.isCurrentMonthDay, active: dayData.id === activeDay?.id })}
      key={`${dayData.dateNum}${dayData.weekDayName}`}
    >
      <div className={clsx('days-grid__day-header')}>
        <div>{dayData.dateNum}</div>
        <div>{dayData.weekDayName}</div>
      </div>
      <EventList dayData={dayData} handleEventClick={handleEventClick} />
    </div>
  );
};
