// src/Button.js
import React from 'react';
import styles from './Button.module.css'; // Import the CSS file for styling

const Button = (props) => {
  return (
    <button
      type={props.type || 'button'}
      className={`${styles['custom-button']} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
