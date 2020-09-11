import React from 'react';
import './Toolbar.css';
import PropTypes from 'prop-types';

export default function Toolbar({ title, leftItems, rightItems }) {
  return (
    <div className="toolbar">
      <div className="left-items">{leftItems}</div>
      <h1 className="toolbar-title">{title}</h1>
      <div className="right-items">{rightItems}</div>
    </div>
  );
}
Toolbar.propTypes = {
  title: PropTypes.node.isRequired,
  leftItems: PropTypes.node.isRequired,
  rightItems: PropTypes.node.isRequired,
};
