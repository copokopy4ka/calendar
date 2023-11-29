import { FC } from 'react';
import clsx from 'clsx';
import { ReactComponent as ArrowIcon } from 'assets/arrow-icon.svg';
import './style.scss';
import { useArrowButtonsControl } from 'shared/hooks/useArrowButtonsControl';

interface ArrowButtonsControlProps {
  handleOpenModal: () => void;
}

export const ArrowButtonsControl: FC<ArrowButtonsControlProps> = ({ handleOpenModal }) => {
  const { dateText, handlePrevButtonClick, handleNextButtonClick } = useArrowButtonsControl();

  return (
    <div className={clsx('arrow-buttons')}>
      <button onClick={handlePrevButtonClick} className={clsx('arrow-buttons__button', 'left')}>
        <ArrowIcon />
      </button>
      <button onClick={handleOpenModal} className={clsx('arrow-buttons__text')}>
        {dateText}
      </button>
      <button onClick={handleNextButtonClick} className={clsx('arrow-buttons__button', 'right')}>
        <ArrowIcon />
      </button>
    </div>
  );
};
