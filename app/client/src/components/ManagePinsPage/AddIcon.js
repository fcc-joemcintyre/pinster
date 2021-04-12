import React from 'react';
import PropTypes from 'prop-types';

export const AddIcon = ({ size, color }) => (
  <svg fill={color} height={size} width={size} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='12' cy='12' r='11' strokeWidth='2' stroke={color} fill='none' />
    <line x1='12' y1='6' x2='12' y2='18' strokeWidth='2' stroke={color} />
    <line x1='6' y1='12' x2='18' y2='12' strokeWidth='2' stroke={color} />
  </svg>
);

AddIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

AddIcon.defaultProps = {
  size: 24,
  color: '#000000',
};
