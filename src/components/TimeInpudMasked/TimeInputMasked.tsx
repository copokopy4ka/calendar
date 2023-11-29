import clsx from 'clsx';
import { FC, ForwardedRef, forwardRef, useCallback } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { isValidTimeInput } from 'utils/helpers';
import { ReactComponent as ClockIcon } from 'assets/clock-icon.svg';
import './style.scss';

interface TimeInputMaskedProps {
  name: string;
  control: Control<FieldValues, any>;
  errorMessage: string;
  isOpen: boolean;
}

export const TimeInputMasked: FC<TimeInputMaskedProps> = forwardRef(
  ({ name, control, errorMessage }, ref: ForwardedRef<HTMLInputElement>) => {
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
            <div className={clsx('time-input', { error: !!errorMessage })}>
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
              <ClockIcon className={clsx('time-input__end-icon')} />
              {errorMessage && <p className={clsx('time-input__error-message')}>{errorMessage}</p>}
              <div className={clsx('time-input__fake-input-border')} />
            </div>
          );
        }}
      />
    );
  }
);
