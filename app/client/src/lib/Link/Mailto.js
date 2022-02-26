import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export const Mailto = ({ to, subject, children, ...props }) => (
  <a href={`mailto:${to}${subject && `?subject=${subject}`}`} {...props}>{children}</a>
);

Mailto.propTypes = {
  to: PropTypes.string.isRequired,
  subject: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Mailto.defaultProps = {
  subject: null,
};

export const PlainMailto = styled (Mailto)`
  text-decoration: none;
  ${({ c }) => c && `
    color: ${c};
    &:visited: {
      color: ${c}
    }
  `};
`;
