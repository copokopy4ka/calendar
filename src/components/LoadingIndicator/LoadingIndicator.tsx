import { FC } from 'react';
import clsx from 'clsx';
import './style.scss';

interface LoadingIndicatorProps {
  isLoading: boolean;
}

export const LoadingIndicator: FC<LoadingIndicatorProps> = ({ isLoading }) => {
  return (
    <div className={clsx('loading-indicator', { active: isLoading })}>
      <div className={clsx('loading-indicator__loader')}></div>
    </div>
  );
};
