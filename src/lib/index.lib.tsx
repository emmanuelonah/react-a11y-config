import React from 'react';

import { IcnHuman } from '../assets';
import { useBoolean } from '../hooks';
import { Portal, ConfigUi } from '../components';

import './index.styles.css';

type PrimitiveAsideProps = React.ComponentPropsWithoutRef<'aside'>;
type A11yConfigElement = React.ElementRef<'aside'>;
interface A11yConfigProps extends PrimitiveAsideProps {
  open?: boolean;
}

export const A11yConfig = React.forwardRef<A11yConfigElement, A11yConfigProps>(
  function A11yConfig({ open, ...restProps }, forwardedRef) {
    const [show, { toggle }] = useBoolean(open);

    return (
      <Portal elementType="a11yconfig">
        <button
          aria-label={`${show ? 'Open' : 'Close'} configurator`}
          className="open-btn"
          onClick={toggle}
        >
          <IcnHuman />
        </button>
        <ConfigUi
          {...restProps}
          ref={forwardedRef}
          show={show}
          onClose={toggle}
        />
      </Portal>
    );
  }
);
