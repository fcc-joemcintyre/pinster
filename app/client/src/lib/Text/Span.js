import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Font } from './Font';
import { Size } from './Size';

export const Span = styled.span`
  ${Font}
  ${Size}
  color: ${(props) => props.c};
`;

Span.propTypes = {
  c: PropTypes.string,
};

Span.defaultProps = {
  c: null,
};
