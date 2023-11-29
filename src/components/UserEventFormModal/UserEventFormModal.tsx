import { FC } from 'react';
import { Modal } from 'components/Modal/Modal';
import { UserEventForm } from 'components/UserEventForm/UserEventForm';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { UserEvent } from 'core/types/events.type';
import { MonthActiveDay } from 'core/types/calendar.type';

interface UserEventFormModalProps {
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: SubmitHandler<FieldValues>;
  userEventData: UserEvent | null;
  handleDeleteEvent: (id: string) => void;
  selectedDay: MonthActiveDay;
}

export const UserEventFormModal: FC<UserEventFormModalProps> = ({
  isOpen,
  handleClose,
  onSubmit,
  userEventData,
  handleDeleteEvent,
  selectedDay,
}) => {
  return (
    <Modal id='user-event-form-modal' isOpen={isOpen} handleClose={handleClose}>
      <UserEventForm
        onSubmit={onSubmit}
        handleClose={handleClose}
        isOpen={isOpen}
        userEventData={userEventData}
        handleDeleteEvent={handleDeleteEvent}
        selectedDay={selectedDay}
      />
    </Modal>
  );
};
