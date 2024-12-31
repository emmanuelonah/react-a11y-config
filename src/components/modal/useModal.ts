import { useCallback, useEffect, RefObject } from 'react';

type ArgType = {
  lock: boolean;
  ref: RefObject<HTMLElement>;
  onClose?(): void;
};

export function useModal({ ref, onClose, lock }: ArgType): void {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const shouldCloseOnOutClick = !lock && onClose;
      const clickedOutside =
        ref.current && !ref.current.contains(event.target as Node);

      if (shouldCloseOnOutClick && clickedOutside) onClose();
    },
    [lock, onClose, ref]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
}
