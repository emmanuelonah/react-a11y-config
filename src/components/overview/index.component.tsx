import React from 'react';

import './index.styles.css';

export function Overview() {
  return (
    <div className="overview">
      <div>
        <h1 className="heading">Headings</h1>
        <p className="paragraph">Contents</p>
      </div>
      <div className="wheelchair">
        <div className="wheelchair-seat"></div>
        <div className="wheelchair-backrest"></div>
        <div className="wheelchair-wheel left-wheel"></div>
        <div className="wheelchair-wheel right-wheel"></div>
        <div className="wheelchair-armrest left-armrest"></div>
        <div className="wheelchair-armrest right-armrest"></div>
      </div>
    </div>
  );
}
