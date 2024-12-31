import React, { useRef } from 'react';

import { Modal } from '../../components';
import { useConfig, Configs } from '../../hooks';
import { Overview } from '../overview/index.component';
import { SetLanguage } from '../set-language/index.component';
import { FontsWidget } from '../fonts-widget/index.component';
import { ColorsWidget } from '../colors-widget/index.component';

import './index.styles.css';

type PrimitiveAsideProps = React.ComponentPropsWithoutRef<'aside'>;
type ConfigUiElement = React.ElementRef<'aside'>;
interface ConfigUiProps extends PrimitiveAsideProps {
  show: boolean;
  onClose(): void;
}

export const ConfigUi = React.forwardRef<ConfigUiElement, ConfigUiProps>(
  function ConfigUi({ show, onClose, ...restProp }, forwardedRef) {
    const configUiFormRef = useRef<HTMLFormElement>(null);
    const { input, configs, onConfigChange, onReset } = useConfig();

    return (
      <Modal isOpen={!show} onClose={onClose}>
        <aside {...restProp} ref={forwardedRef} className="config-ui-aside">
          <form ref={configUiFormRef}>
            <SetLanguage onClose={onClose} onConfigChange={onConfigChange} />
            <Overview />
            <ColorsWidget
              colors={input.colors}
              configs={configs as Configs}
              onConfigChange={onConfigChange}
            />
            <FontsWidget
              fonts={input.fonts}
              configs={configs as Configs}
              onConfigChange={onConfigChange}
            />
            <button type="reset" className="reset-btn" onClick={onReset}>
              Reset
            </button>
          </form>
        </aside>
      </Modal>
    );
  }
);
