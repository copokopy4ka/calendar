import { UseModalResponse } from 'core/types/custom-hooks.type';
import { useState } from 'react';

/**
 * A custom hook for managing the state of a modal.
 *
 * This hook provides the functionalities to open and close a modal,
 * as well as the current state (open or closed) of the modal. It is
 * useful for controlling the visibility of modal dialogs in a React application.
 *
 * @returns {UseModalResponse} An object containing:
 * - `isOpen`: A boolean indicating whether the modal is open.
 * - `open`: A function to open the modal.
 * - `close`: A function to close the modal.
 *
 * @example
 * const { isOpen, open, close } = useModal();
 * // Use these values and functions to control a modal's state and interactions.
 */
export const useModal = (): UseModalResponse => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    open,
    close,
  };
};
