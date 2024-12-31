import React, { useRef } from 'react';

import { Portal } from '..';
import { useComposeRefs } from '../../hooks';

import { useModal } from './useModal';

type PrimitiveDivProps = React.ComponentPropsWithoutRef<'div'>;
type ModalElement = React.ElementRef<'div'>;
interface ModalProps extends PrimitiveDivProps {
  isOpen: boolean;
  name?: string;
  lock?: boolean;
  onClose?(): void;
}

export const Modal = React.forwardRef<ModalElement, ModalProps>(function Modal(
  { isOpen, onClose, children, lock = false, name = 'modal', ...restProps },
  forwardedRef
) {
  const ref = useRef<HTMLDivElement>(null!);
  useComposeRefs(forwardedRef, ref);
  useModal({ ref, lock, onClose });

  if (!isOpen) return null;

  return (
    <Portal elementType={name}>
      <div
        {...restProps}
        ref={forwardedRef}
        role="dialog"
        aria-modal="true"
        aria-live="polite"
      >
        {children}
      </div>
    </Portal>
  );
});
