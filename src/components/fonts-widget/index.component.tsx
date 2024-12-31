import React from 'react';

import { Input } from '..';
import { IcnFont } from '../../assets';
import { composeEvents } from '../../utils/compose-events/index.util';
import { InputPropTypes, Configs, OnConfigChange } from '../../hooks/useConfig';

import './index.styles.css';

type PropTypes = {
  configs: Configs;
  fonts: InputPropTypes[];
  onConfigChange: OnConfigChange;
};

export function FontsWidget({ fonts, configs, onConfigChange }: PropTypes) {
  return (
    <section className="config-section">
      <h3 className="title">
        <IcnFont />
        <span>Font Adjustment</span>
      </h3>
      <div>
        {fonts.map(({ id, label, name, type, onChange }) => (
          <label key={id} htmlFor={id}>
            {label}
            <Input
              type={type}
              id={id}
              name={name}
              inputMode="numeric"
              value={configs[name as keyof Configs]}
              onChange={composeEvents(onConfigChange, onChange)}
            />
          </label>
        ))}
      </div>
    </section>
  );
}
