import { FC, ForwardedRef, forwardRef } from 'react';
import clsx from 'clsx';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import './style.scss';

interface DateInputMaskedProps {
  name: string;
  control: Control<FieldValues, any>;
  errorMessage: string;
}

export const DateInputMasked: FC<DateInputMaskedProps> = forwardRef(
  ({ name, errorMessage, control }, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <div className={clsx('date-input', { error: !!errorMessage })}>
            <label className={clsx('date-input__label')} htmlFor={name}>
              Date *
            </label>
            <IMaskInput
              mask={Date}
              min={new Date(1900, 0, 1)}
              max={new Date(2100, 0, 1)}
              autofix
              id={name}
              value={value}
              onAccept={onChange}
              className={clsx('date-input__input')}
              placeholder='--.--.----'
              ref={ref}
              autoComplete='off'
            />
            {errorMessage && <p className={clsx('date-input__error-message')}>{errorMessage}</p>}
            <div className={clsx('date-input__fake-input-border')} />
          </div>
        )}
      />
    );
  }
);
