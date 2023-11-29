import { FC, ForwardedRef, forwardRef } from 'react';
import clsx from 'clsx';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { ReactComponent as BrushIcon } from 'assets/brush-icon.svg';
import './style.scss';
import { HELPER_TEXT } from 'constants/helperElementTexts';

interface InputProps {
  placeholder?: string;
  label: string;
  name: string;
  control: Control<FieldValues, any>;
  errorMessage?: string;
  handleAdornment: () => void;
}

export const Input: FC<InputProps> = forwardRef(
  ({ placeholder, label, errorMessage, name, control, handleAdornment }, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <div className={clsx('input__wrapper', { error: !!errorMessage })}>
            <label className={clsx('input__label')} htmlFor={name}>
              {label}
            </label>
            <input
              id={name}
              multiple
              value={value}
              onChange={onChange}
              placeholder={placeholder || ''}
              className={clsx('input__input')}
              ref={ref}
              autoComplete='off'
            />
            <button
              title={HELPER_TEXT.CLEAR_TITLE}
              onClick={handleAdornment}
              type='button'
              className={clsx('input__end-button')}
            >
              <BrushIcon />
            </button>
            {errorMessage && <p className={clsx('input__error-message')}>{errorMessage}</p>}
            <div className={clsx('input__fake-input-border')} />
          </div>
        )}
      />
    );
  }
);
