import React from 'react';
import PropTypes from 'prop-types';

export const DropMenuIcon = ({ size, color }) => (
  /* eslint-disable max-len */
  <svg fill={color} height={size} width={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x='0' y='0' width='24' height='24' fill="none" />
    <line x1='2' y1='6' x2='22' y2='6' strokeWidth='3' strokeLinecap='round' stroke={color} />
    <line x1='2' y1='12' x2='22' y2='12' strokeWidth='3' strokeLinecap='round' stroke={color} />
    <line x1='2' y1='18' x2='22' y2='18' strokeWidth='3' strokeLinecap='round' stroke={color} />
  </svg>
  /* eslint-enable max-len */
);

DropMenuIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

DropMenuIcon.defaultProps = {
  size: 20,
  color: '#000000',
};
