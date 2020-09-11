import React from 'react';
import './Compose.css';
import PropTypes from 'prop-types';

export default function Compose({ rightItems }) {
  return (
    <div className="compose">
      <input
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
      />

      {rightItems}
    </div>
  );
}
Compose.propTypes = {
  rightItems: PropTypes.node.isRequired,
};
