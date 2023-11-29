import { FC } from 'react';
import clsx from 'clsx';
import { Day } from './Day/Day';
import { UserEvent } from 'core/types/events.type';
import { MonthActiveDay, MonthGridItem } from 'core/types/calendar.type';
import './style.scss';

interface CalendarGridProps {
	daysList: MonthGridItem[];
	selectedDay: MonthActiveDay | null;
	handleDayClick: (dayData: MonthActiveDay) => void;
	handleEventClick: (userEvent: UserEvent) => void;
}

export const CalendarGrid: FC<CalendarGridProps> = ({ daysList, selectedDay, handleDayClick, handleEventClick }) => {
  return (
    <main className={clsx('days-grid', { large: daysList.length > 35 })}>
      {daysList.map((item) => (
        <Day key={item.id} dayData={item} handleDayClick={handleDayClick} activeDay={selectedDay} handleEventClick={handleEventClick} />
      ))}
    </main>
  );
};
