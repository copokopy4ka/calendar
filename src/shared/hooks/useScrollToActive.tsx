import { createRef, useEffect, useRef } from 'react';

/**
 * A custom hook that automatically scrolls to an active item in a list.
 *
 * This hook creates a list of refs for each item in the provided list and
 * uses `scrollIntoView` to scroll to the active item whenever it changes.
 * It's useful for scenarios like navigating through a list of items with keyboard or
 * scrolling to a selected item in a long list.
 *
 * @param {number|string|null} activeItem - The active item's identifier or index.
 *        If null, no scrolling will occur.
 * @param {Array<number|string>} itemsList - An array of items (numbers or strings)
 *        which represents the list to create refs for. Each item should be unique.
 * @returns {React.MutableRefObject<Array<React.RefObject<HTMLButtonElement>>>} A ref object
 *          containing a ref for each item in the items list.
 *
 * @example
 * const items = ['Item 1', 'Item 2', 'Item 3'];
 * const [activeItem, setActiveItem] = useState(null);
 * const refsList = useScrollToActive(activeItem, items);
 * // Render the items and use refsList to attach refs to each item.
 */
export const useScrollToActive = (
  activeItem: number | string | null,
  itemsList: number[] | string[]
): React.MutableRefObject<Array<React.RefObject<HTMLButtonElement>>> => {
  const refsList = useRef(itemsList.map(() => createRef<HTMLButtonElement>()));

  useEffect(() => {
    if (activeItem) {
      const activeItemIndex = itemsList.findIndex((item, index) => item === activeItem || index === activeItem);
      const activeItemRef = refsList.current[activeItemIndex];
      if (activeItemRef && activeItemRef.current) {
        activeItemRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [activeItem, itemsList, refsList]);

  return refsList;
};
