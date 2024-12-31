import React from 'react';

import './index.styles.css';

export function Overview() {
  return (
    <div className="container">
      <div className="dog">
        <div className="ear"></div>
        <div className="head"></div>
        <div className="body"></div>
        <div className="tail"></div>
        <div className="leg front-leg"></div>
        <div className="leg back-leg"></div>
      </div>
      <h1 className="heading">Headings</h1>
      <p className="paragraph">Contents</p>
    </div>
  );
}
