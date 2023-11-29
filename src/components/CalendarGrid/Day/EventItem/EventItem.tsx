import { FC, useCallback } from 'react';
import clsx from 'clsx';
import { UserEvent } from 'core/types/events.type';

interface EventItemProps {
  userEvent: UserEvent;
  isDisabled: boolean;
  handleClick: (userEvent: UserEvent) => void;
}

export const EventItem: FC<EventItemProps> = ({ userEvent, handleClick, isDisabled }) => {
  const onClick = useCallback(() => handleClick(userEvent), [userEvent, handleClick]);
  return (
    <button
      onClick={onClick}
      key={userEvent.id}
      className={clsx('days-grid__events_event-wrapper', { disabled: isDisabled })}
    >
      <p className={clsx('days-grid__events_event')}>{userEvent.title}</p>
    </button>
  );
};
