import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Font } from './Font';
import { Size } from './Size';

export const P = styled.p`
  ${Font}
  ${Size}
  margin: 0 0 10px 0;
  color: ${(props) => props.c};
  text-align: ${(props) => (props.center ? 'center' : props.right ? 'right' : props.left ? 'left' : null)};
`;

P.propTypes = {
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
};

P.defaultProps = {
  left: false,
  center: false,
  right: false,
};
