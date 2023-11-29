import { FC } from 'react';
import clsx from 'clsx';
import { YEARS } from 'constants/dates';
import './style.scss';

interface YearsListProps {
  handlePickYear: (year: number) => void;
  currentPickedYear: number | null;
}

export const YearsList: FC<YearsListProps> = ({ handlePickYear, currentPickedYear }) => {
  return (
    <div className={clsx('years-list')}>
      {YEARS.map((year) => (
        <button
          key={year}
          className={clsx('years-list__year', { active: currentPickedYear === year })}
          onClick={() => handlePickYear(year)}
        >
          {year}
        </button>
      ))}
    </div>
  );
};
