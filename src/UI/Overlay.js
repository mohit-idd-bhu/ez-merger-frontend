import React from 'react';
import './Overlay.css';  // We'll update this CSS file next

const Overlay = (props) => {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <div className="spinner"></div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Overlay;
