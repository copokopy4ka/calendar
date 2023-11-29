import { FC, useCallback } from 'react';
import clsx from 'clsx';
import { Input } from 'components/Input/Input';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useUserEventForm } from 'shared/hooks/useUserEventForm';
import { UserEvent } from 'core/types/events.type';
import { DateInputMasked } from 'components/DateInputMasked/DateInputMasked';
import { TimeInputMasked } from 'components/TimeInpudMasked/TimeInputMasked';
import { ERROR_MESSAGES } from 'constants/error-messages';
import { TextArea } from 'components/TextArea/TextArea';
import { ReactComponent as DeleteIcon } from 'assets/trash-icon.svg';
import './style.scss';
import { MonthActiveDay } from 'core/types/calendar.type';

interface UserEventFormProps {
  isOpen: boolean;
  onSubmit: SubmitHandler<FieldValues>;
  handleClose: () => void;
  userEventData: UserEvent | null;
  handleDeleteEvent: (id: string) => void;
  selectedDay: MonthActiveDay;
}

export const UserEventForm: FC<UserEventFormProps> = ({
  onSubmit,
  userEventData,
  handleClose,
  isOpen,
  handleDeleteEvent,
  selectedDay,
}) => {
  const {
    handleSubmit,
    getErrorMessage,
    register,
    errors,
    control,
    handleClearTitle,
    handleReturnExistingDescription,
    subtitle,
    isDisabledSubmitButton,
    title,
  } = useUserEventForm(isOpen, userEventData, selectedDay);

  const handleDeleteButtonClick = useCallback(() => {
    userEventData && handleDeleteEvent(userEventData.id);
    handleClose();
  }, [handleClose, handleDeleteEvent, userEventData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx('event-form', { active: isOpen })}>
      <div className={clsx('event-form__content-wrapper')}>
        <div className={clsx('event-form__content-header')}>
          <h2 className={clsx('event-form__title')}>{title}</h2>
          {subtitle && <h5 className={clsx('event-form__subtitle')}>{subtitle}</h5>}
          <button onClick={handleClose} type='button' className={clsx('event-form__close-button')} />
        </div>
        <div className={clsx('event-form__fields-wrapper')}>
          <Input
            errorMessage={getErrorMessage(errors, 'title')}
            {...register('title', {
              required: ERROR_MESSAGES.REQUIRED_FIELD,
              minLength: { value: 3, message: ERROR_MESSAGES.MIN_LENGTH },
            })}
            label='Title *'
            placeholder='Title goes here'
            control={control}
            handleAdornment={handleClearTitle}
          />
          <TextArea
            errorMessage={getErrorMessage(errors, 'description')}
            {...register('description', {
              minLength: { value: 3, message: ERROR_MESSAGES.MIN_LENGTH },
            })}
            label='Description'
            control={control}
            withIcon={!!userEventData}
            handleReturnExistingDescription={handleReturnExistingDescription}
          />
          <div className={clsx('event-form__date-time-fields-wrapper')}>
            <DateInputMasked
              errorMessage={getErrorMessage(errors, 'date')}
              control={control}
              {...register('date', {
                required: ERROR_MESSAGES.REQUIRED_FIELD,
                minLength: {
                  value: 10,
                  message: ERROR_MESSAGES.INCORRECT_DATE,
                },
              })}
            />
            <TimeInputMasked
              errorMessage={getErrorMessage(errors, 'time')}
              control={control}
              {...register('time', {
                minLength: { value: 5, message: ERROR_MESSAGES.INCORRECT_TIME },
              })}
              isOpen={isOpen}
            />
          </div>
        </div>
        <div className={clsx('event-form__bottom-buttons-wrapper')}>
          {userEventData && (
            <button onClick={handleDeleteButtonClick} className={clsx('event-form__delete-button')} type='button'>
              <DeleteIcon />
            </button>
          )}
          <button disabled={isDisabledSubmitButton} className={clsx('event-form__submit-button')} type='submit'>
            save
          </button>
        </div>
      </div>
    </form>
  );
};
