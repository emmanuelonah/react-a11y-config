import React from 'react';

import { Input } from '..';
import { IcnColorDrop } from '../../assets';
import { composeEvents } from '../../utils/compose-events/index.util';
import { InputPropTypes, Configs, OnConfigChange } from '../../hooks/useConfig';

import './index.styles.css';

type PropTypes = {
  configs: Configs;
  colors: InputPropTypes[];
  onConfigChange: OnConfigChange;
};

export function ColorsWidget({ colors, configs, onConfigChange }: PropTypes) {
  return (
    <section className="config-section">
      <h3 className="title">
        <IcnColorDrop />
        <span>Color Adjustment</span>
      </h3>
      <div>
        {colors.map(({ id, label, name, type, onChange }) => (
          <label key={id} htmlFor={id}>
            {label}
            <Input
              type={type}
              id={id}
              name={name}
              value={configs[name as keyof Configs]}
              onChange={composeEvents(onConfigChange, onChange)}
            />
          </label>
        ))}
      </div>
    </section>
  );
}
