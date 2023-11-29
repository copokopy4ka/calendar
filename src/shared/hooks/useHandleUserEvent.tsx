import { useCallback, useEffect, useState } from 'react';
import { CreateUserEventDto, UpdateUserEventDto, UserEvent } from 'core/types/events.type';
import { useDispatch } from 'react-redux';
import { createEvent, deleteEvent, updateEvent } from 'store/events-entity/actions';
import { useModal } from 'shared/hooks/useModal';
import { FieldValues } from 'react-hook-form';
import { formateInputDateValue } from 'utils/helpers';
import { UseHandleUserEventResponse } from 'core/types/custom-hooks.type';

/**
 * A custom hook for handling user events in an application.
 *
 * This hook manages the selection, creation, updating, and deletion of user events. It also controls
 * a modal's state for displaying event details and forms. The hook leverages Redux for dispatching
 * event-related actions.
 *
 * @returns {object} An object containing:
 * - `selectedEvent`: The currently selected event or null if no event is selected.
 * - `open`: A function to open the modal.
 * - `isOpen`: A boolean state indicating whether the modal is open.
 * - `close`: A function to close the modal.
 * - `handleEventClick`: A function to select an event and open the modal for event details.
 * - `handleSubmitForm`: A function to submit the event form, handling both creation and updating of events.
 * - `handleDeleteEvent`: A function to delete a specific event by its id.
 *
 * @example
 * const {
 *   selectedEvent,
 *   open,
 *   isOpen,
 *   close,
 *   handleEventClick,
 *   handleSubmitForm,
 *   handleDeleteEvent
 * } = useHandleUserEvent();
 * // These can now be used in components to manage user events and modal interactions.
 */
export const useHandleUserEvent = (): UseHandleUserEventResponse => {
  const dispatch = useDispatch();
  const { open, isOpen, close } = useModal();
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
        dispatch(updateEvent(updateEventData));
        setSelectedEvent(null);
      } else {
        const createEventData: CreateUserEventDto = {
          title: values.title,
          date: values.time ? formateInputDateValue(values.date, values.time) : formateInputDateValue(values.date),
        };
        values.time && (createEventData.time = values.time);
        values.description && (createEventData.description = values.description);
        dispatch(createEvent(createEventData));
      }
      close();
    },
    [close, dispatch, selectedEvent]
  );

  const handleDeleteEvent = useCallback(
    (id: string) => {
      dispatch(deleteEvent(id));
      setSelectedEvent(null);
    },
    [dispatch]
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
