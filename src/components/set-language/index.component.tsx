import React from 'react';

import { languages } from '../../hooks';
import { OnConfigChange } from '../../hooks/useConfig';

import './index.styles.css';

type PropTypes = {
  onClose(): void;
  onConfigChange: OnConfigChange;
};

export function SetLanguage({ onClose, onConfigChange }: PropTypes) {
  return (
    <div className="lang-widget">
      <button
        aria-label="Close configurator"
        onClick={onClose}
        className="close-btn"
      >
        &#10005;
      </button>
      <select
        name="language"
        defaultValue="eng"
        className="lang-select"
        onChange={onConfigChange}
      >
        {languages.map(lang => (
          <option key={lang.id} value={lang.value}>
            {lang.text}
          </option>
        ))}
      </select>
    </div>
  );
}
