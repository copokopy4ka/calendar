import { FC } from 'react';
import { HOURS } from 'constants/dates';
import clsx from 'clsx';
import './style.scss';
import { useScrollToActive } from 'shared/hooks/useScrollToActive';

interface HoursListProps {
  handlePickHour: (hour: string) => void;
  currentPickedHour: string | null;
}

export const HoursList: FC<HoursListProps> = ({ handlePickHour, currentPickedHour }) => {
  const refsList = useScrollToActive(currentPickedHour, HOURS);

  return (
    <div className={clsx('hours-list')}>
      {HOURS.map((hour, index) => (
        <button
          key={hour}
          className={clsx('hours-list__hour', { active: currentPickedHour === hour })}
          onClick={() => handlePickHour(hour)}
          ref={refsList.current[index]}
        >
          {hour}
        </button>
      ))}
    </div>
  );
};
