import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export const TextLink = ({ to, children, ...props }) => (
  <a
    href={to}
    target='_blank'
    rel='noopener noreferrer'
    {...props}
  >
    {children}
  </a>
);

TextLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export const PlainTextLink = styled (TextLink)`
  text-decoration: none;
  ${({ c }) => c && `
    color: ${c};
    &:visited: {
      color: ${c}
    }
  `};
`;
