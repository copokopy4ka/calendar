import { FC } from 'react';
import clsx from 'clsx';
import { MINUTES } from 'constants/dates';
import './style.scss';
import { useScrollToActive } from 'shared/hooks/useScrollToActive';

interface MinutesListProps {
  handlePickMinute: (minute: string) => void;
  currentPickedMinute: string | null;
}

export const MinutesList: FC<MinutesListProps> = ({ handlePickMinute, currentPickedMinute }) => {
  const refsList = useScrollToActive(currentPickedMinute, MINUTES);

  return (
    <div className={clsx('minutes-list')}>
      {MINUTES.map((minute, index) => (
        <button
          key={minute}
          className={clsx('minutes-list__minute', { active: currentPickedMinute === minute })}
          onClick={() => handlePickMinute(minute)}
          ref={refsList.current[index]}
        >
          {minute}
        </button>
      ))}
    </div>
  );
};
