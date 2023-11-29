import { FC } from 'react';
import clsx from 'clsx';
import { YEARS } from 'constants/dates';
import './style.scss';
import { useScrollToActive } from 'shared/hooks/useScrollToActive';

interface YearsListProps {
  handlePickYear: (year: number) => void;
  currentPickedYear: number | null;
}

export const YearsList: FC<YearsListProps> = ({ handlePickYear, currentPickedYear }) => {
  const refsList = useScrollToActive(currentPickedYear, YEARS);

  return (
    <div className={clsx('years-list')}>
      {YEARS.map((year, index) => (
        <button
          key={year}
          className={clsx('years-list__year', { active: currentPickedYear === year })}
          onClick={() => handlePickYear(year)}
          ref={refsList.current[index]}
        >
          {year}
        </button>
      ))}
    </div>
  );
};
