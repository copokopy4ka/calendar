import { useCallback, useContext, useEffect, useState } from 'react';
import { CreateUserEventDto, UpdateUserEventDto, UserEvent } from 'core/types/events.type';
import {
  createEvent,
  createEventDataBase,
  deleteEvent,
  deleteEventDataBase,
  updateEvent,
  updateEventDataBase,
} from 'store/events-entity/actions';
import { useModal } from 'shared/hooks/useModal';
import { FieldValues } from 'react-hook-form';
import { formateInputDateValue } from 'utils/helpers';
import { UseHandleUserEventResponse } from 'core/types/custom-hooks.type';
import { useThunkDispatch } from 'shared/hooks/useThunkDispatch';
import { MainLayoutContext } from 'layouts/MainLayout/MainLayout.context';

/**
 * Custom hook for managing user event interactions.
 *
 * This hook provides functionalities for handling user event operations like
 * selecting an event, submitting event form data, and deleting an event. It
 * integrates modal control and event state management.
 *
 * @returns {UseHandleUserEventResponse} An object containing:
 * - selectedEvent: The currently selected event or null.
 * - open: Function to open the modal.
 * - isOpen: State variable indicating whether the modal is open.
 * - close: Function to close the modal.
 * - handleEventClick: Function to handle event selection.
 * - handleSubmitForm: Function to handle form submission for event creation or update.
 * - handleDeleteEvent: Function to handle the deletion of an event.
 *
 * @remarks
 * - The hook uses the `useThunkDispatch` hook for dispatching Redux actions.
 * - It utilizes the `useModal` hook for modal operations.
 * - The `useState` and `useCallback` hooks are used for managing state and memoizing functions respectively.
 * - The hook also uses `useContext` to access the `isUsingLocalStorage` flag from `MainLayoutContext`.
 * - It reacts to the modal open state to reset the selected event when the modal is closed.
 */
export const useHandleUserEvent = (): UseHandleUserEventResponse => {
  const dispatch = useThunkDispatch();
  const { open, isOpen, close } = useModal();
  const { isUsingLocalStorage } = useContext(MainLayoutContext);
  const [selectedEvent, setSelectedEvent] = useState<UserEvent | null>(null);

  const handleEventClick = useCallback(
    (userEvent: UserEvent) => {
      setSelectedEvent(userEvent);
      open();
    },
    [open]
  );

  const handleSubmitForm = useCallback(
    (values: FieldValues) => {
      if (selectedEvent) {
        const updateEventData: UpdateUserEventDto = {
          id: selectedEvent.id,
          title: values.title,
          date: values.time ? formateInputDateValue(values.date, values.time) : formateInputDateValue(values.date),
        };
        values.time && (updateEventData.time = values.time);
        values.description && (updateEventData.description = values.description);

        if (isUsingLocalStorage) {
          dispatch(updateEvent(updateEventData));
        } else {
          dispatch(updateEventDataBase(updateEventData));
        }

        setSelectedEvent(null);
      } else {
        const createEventData: CreateUserEventDto = {
          title: values.title,
          date: values.time ? formateInputDateValue(values.date, values.time) : formateInputDateValue(values.date),
        };
        values.time && (createEventData.time = values.time);
        values.description && (createEventData.description = values.description);

        if (isUsingLocalStorage) {
          dispatch(createEvent(createEventData));
        } else {
          dispatch(createEventDataBase(createEventData));
        }
      }
      close();
    },
    [close, dispatch, isUsingLocalStorage, selectedEvent]
  );

  const handleDeleteEvent = useCallback(
    (id: string) => {
      if (isUsingLocalStorage) {
        dispatch(deleteEvent(id));
      } else {
        dispatch(deleteEventDataBase(id));
      }
      setSelectedEvent(null);
    },
    [dispatch, isUsingLocalStorage]
  );

  useEffect(() => {
    if (!isOpen) setSelectedEvent(null);
  }, [isOpen]);

  return {
    selectedEvent,
    open,
    isOpen,
    close,
    handleEventClick,
    handleSubmitForm,
    handleDeleteEvent,
  };
};
