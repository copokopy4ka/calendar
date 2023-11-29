import { FC, ForwardedRef, forwardRef } from 'react';
import clsx from 'clsx';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { ReactComponent as CircleArrowIcon } from 'assets/refresh-icon.svg';
import './style.scss';
import { HELPER_TEXT } from 'constants/helperElementTexts';

interface TextAreaProps {
  placeholder?: string;
  label: string;
  name: string;
  control: Control<FieldValues, any>;
  errorMessage?: string;
  rows?: number;
  withIcon: boolean;
  handleReturnExistingDescription: () => void;
}

export const TextArea: FC<TextAreaProps> = forwardRef(
  (
    { placeholder, label, errorMessage, name, control, rows = 5, withIcon, handleReturnExistingDescription },
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <div className={clsx('textarea__wrapper', { error: !!errorMessage })}>
            <label className={clsx('textarea__label')} htmlFor={name}>
              {label}
            </label>
            <textarea
              id={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder || ''}
              className={clsx('textarea__textarea')}
              ref={ref}
              rows={rows}
            />
            {withIcon && (
              <button
                title={HELPER_TEXT.RETURN_EXISTING_DESCRIPTION}
                type='button'
                className={clsx('textarea__end-button')}
                onClick={handleReturnExistingDescription}
              >
                <CircleArrowIcon />
              </button>
            )}
            {errorMessage && <p className={clsx('textarea__error-message')}>{errorMessage}</p>}
            <div className={clsx('textarea__fake-textarea-border')} />
          </div>
        )}
      />
    );
  }
);
