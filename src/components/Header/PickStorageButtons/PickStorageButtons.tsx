import { FC, Dispatch, useCallback } from 'react';
import clsx from 'clsx';
import './style.scss';

interface PickStorageButtonsProps {
  isUsingLocalStorage: boolean;
  setIsUsingLocalStorage: Dispatch<React.SetStateAction<boolean>>;
}

export const PickStorageButtons: FC<PickStorageButtonsProps> = ({ isUsingLocalStorage, setIsUsingLocalStorage }) => {
  const handleUseLocalStorage = useCallback(() => setIsUsingLocalStorage(true), [setIsUsingLocalStorage]);
  const handleUseDatabase = useCallback(() => setIsUsingLocalStorage(false), [setIsUsingLocalStorage]);
  return (
    <div className={clsx('pick-storage-buttons')}>
      <button
        onClick={handleUseLocalStorage}
        className={clsx('pick-storage-buttons__button', { active: isUsingLocalStorage })}
      >
        Use Local Storage
      </button>
      <button
        onClick={handleUseDatabase}
        className={clsx('pick-storage-buttons__button', { active: !isUsingLocalStorage })}
      >
        Use Database
      </button>
    </div>
  );
};
