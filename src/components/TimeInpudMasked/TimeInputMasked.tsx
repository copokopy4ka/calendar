import clsx from 'clsx';
import { FC, ForwardedRef, forwardRef, useCallback, useRef } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { isValidTimeInput } from 'utils/helpers';
import { ReactComponent as ClockIcon } from 'assets/clock-icon.svg';
import './style.scss';
import { TimePickerModal } from 'components/TimeInpudMasked/TimePickerModal/TimePickerModal';
import { useModal } from 'shared/hooks/useModal';

interface TimeInputMaskedProps {
  name: string;
  control: Control<FieldValues, any>;
  errorMessage: string;
  handleChangeTime: (timeValue: string) => void;
}

export const TimeInputMasked: FC<TimeInputMaskedProps> = forwardRef(
  ({ name, control, errorMessage, handleChangeTime }, ref: ForwardedRef<HTMLInputElement>) => {
    const { open: openTimeModal, close: closeTimeModal, isOpen: isOpenTimeModal } = useModal();
    const timeInputBlockRef = useRef(null);

    const validateChange = useCallback((value: string, prevValue: string) => {
      if (value.length === 3 && value.at(-1) !== ':') {
        value = `${value.slice(0, 2)}:${value.slice(2)}`;
      }

      if (isValidTimeInput(value)) {
        return value;
      } else {
        return prevValue;
      }
    }, []);

    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => {
          return (
            <div ref={timeInputBlockRef} className={clsx('time-input', { error: !!errorMessage })}>
              <label className={clsx('time-input__label')} htmlFor={name}>
                Begin time
              </label>
              <input
                id={name}
                value={value}
                onChange={(e) => {
                  onChange(validateChange(e.target.value, value));
                }}
                className={clsx('time-input__input')}
                placeholder='--:--'
                ref={ref}
                maxLength={5}
                autoComplete='off'
              />
              <ClockIcon className={clsx('time-input__end-icon')} onClick={openTimeModal} />
              {errorMessage && <p className={clsx('time-input__error-message')}>{errorMessage}</p>}
              <div className={clsx('time-input__fake-input-border')} />
              <TimePickerModal
                anchorEl={timeInputBlockRef.current}
                isOpen={isOpenTimeModal}
                handleClose={closeTimeModal}
                handleChangeTime={handleChangeTime}
              />
            </div>
          );
        }}
      />
    );
  }
);
