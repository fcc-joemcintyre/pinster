import React from 'react';
import PropTypes from 'prop-types';

export const TextLink = ({ href, children, ...props }) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    {...props}
  >
    {children}
  </a>
);

TextLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
