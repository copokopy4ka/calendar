import { FC } from 'react';
import { MONTHS } from 'constants/dates';
import clsx from 'clsx';
import './style.scss';

interface MonthsListProps {
  handlePickMonth: (monthNum: number) => void;
  currentPickedMonth: number | null;
}

export const MonthsList: FC<MonthsListProps> = ({ handlePickMonth, currentPickedMonth }) => {
  return (
    <div className={clsx('months-list')}>
      {MONTHS.map((month, index) => (
        <button
          key={month}
          className={clsx('months-list__month', { active: currentPickedMonth === index })}
          onClick={() => handlePickMonth(index)}
        >
          {month}
        </button>
      ))}
    </div>
  );
};
