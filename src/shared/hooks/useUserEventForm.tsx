import { DATE_FORMAT } from 'constants/date-format';
import { userEventFormDefaultValues } from 'core/config/userEventForm.config';
import { MonthActiveDay } from 'core/types/calendar.type';
import { UseUserEventFormResponse } from 'core/types/custom-hooks.type';
import { UserEvent } from 'core/types/events.type';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FieldErrors, FieldValues, useForm } from 'react-hook-form';
import { formateDateForInputMasked } from 'utils/helpers';

/**
 * A custom hook for managing the user event form.
 *
 * This hook handles the logic for creating and editing user events. It manages form state,
 * validation, and dynamic changes based on provided event data and the selected day. It is
 * utilized in components where user events are created or edited.
 *
 * @param {boolean} isOpen - Indicates if the form is currently open (visible).
 * @param {UserEvent | null} eventData - The event data to be edited, or null for a new event.
 * @param {MonthActiveDay} selectedDay - The currently selected day in the calendar.
 *
 * @returns {object} An object containing:
 * - `register`, `control`, `handleSubmit`, `reset`: Methods from `react-hook-form` for form control.
 * - `errors`: An object containing form validation errors.
 * - `getErrorMessage`: A function to retrieve error messages for specific form fields.
 * - `handleClearTitle`: A function to clear the title field.
 * - `handleReturnExistingDescription`: A function to reset the description to its original value.
 * - `subtitle`: A string containing information about the event's creation or last update date.
 * - `isDisabledSubmitButton`: A boolean indicating whether the submit button should be disabled.
 * - `title`: A string representing the form title, dynamically set based on the context (add or edit).
 *
 * @example
 * const {
 *   register,
 *   control,
 *   handleSubmit,
 *   errors,
 *   getErrorMessage,
 *   reset,
 *   handleClearTitle,
 *   handleReturnExistingDescription,
 *   subtitle,
 *   isDisabledSubmitButton,
 *   title
 * } = useUserEventForm(isOpen, eventData, selectedDay);
 * // Use these functions and variables to manage the user event form in your component.
 */
export const useUserEventForm = (
  isOpen: boolean,
  eventData: UserEvent | null,
  selectedDay: MonthActiveDay
): UseUserEventFormResponse => {
  const currentEventDescription = useMemo(() => (eventData ? eventData.description : null), [eventData]);
  const [title, setTitle] = useState('Add new event');
  const subtitle = useMemo(() => {
    if (eventData) {
      const createdAt = dayjs(eventData.createdAt);
      const updatedAt = dayjs(eventData.updatedAt);
      return updatedAt.isAfter(createdAt)
        ? `Updated at: ${updatedAt.format(DATE_FORMAT.DATE_TIME)}`
        : `Created at: ${createdAt.format(DATE_FORMAT.DATE_TIME)}`;
    }
  }, [eventData]);

  const formValues = useMemo(() => {
    const formDateValue = eventData
      ? formateDateForInputMasked(eventData.date)
      : formateDateForInputMasked(selectedDay.date);

    return {
      title: eventData?.title ? eventData.title : '',
      description: eventData?.description ? eventData.description : '',
      date: formDateValue,
      time: eventData?.time ? eventData.time : '',
    };
  }, [eventData, selectedDay]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: userEventFormDefaultValues });

  const requiredFieldsValues = watch(['title', 'date']);

  const isDisabledSubmitButton = useMemo(() => requiredFieldsValues.some((el) => !el), [requiredFieldsValues]);

  const getErrorMessage = useCallback((errors: FieldErrors<FieldValues>, name: string): string => {
    if (typeof errors?.[name]?.message === 'string' && errors?.[name]?.message) {
      return errors[name]?.message as string;
    }
    return '';
  }, []);

  const handleClearTitle = useCallback(() => {
    setValue('title', '');
  }, [setValue]);

  const handleReturnExistingDescription = useCallback(() => {
    currentEventDescription && setValue('description', currentEventDescription);
  }, [currentEventDescription, setValue]);

  useEffect(() => {
    reset(formValues);
  }, [formValues, reset]);

  useEffect(() => {
    if (!isOpen) {
      reset(formValues);
    }
  }, [formValues, isOpen, reset]);

  useEffect(() => {
    if (eventData && isOpen) {
      setTitle('Edit Your event');
    }
  }, [eventData, isOpen]);

  return {
    register,
    control,
    handleSubmit,
    errors,
    getErrorMessage,
    reset,
    handleClearTitle,
    handleReturnExistingDescription,
    subtitle,
    isDisabledSubmitButton,
    title,
  };
};
