import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Font } from './Font';
import { Size } from './Size';

export const Text = styled.div`
  ${Font}
  ${Size}
  color: ${(props) => props.c};
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  text-align: ${(props) => (props.center ? 'center' : props.right ? 'right' : props.left ? 'left' : null)};
`;

Text.propTypes = {
  inline: PropTypes.bool,
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
  c: PropTypes.string,
};

Text.defaultProps = {
  inline: false,
  left: false,
  center: false,
  right: false,
  c: null,
};
