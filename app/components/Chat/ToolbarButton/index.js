import React from 'react';
import './ToolbarButton.css';
import PropTypes from 'prop-types';

export default function ToolbarButton({ icon }) {
  return <i className={`toolbar-button ${icon}`} />;
}
ToolbarButton.propTypes = {
  icon: PropTypes.string.isRequired,
};
