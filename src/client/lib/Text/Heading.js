import PropTypes from 'prop-types';
import styled from 'styled-components';
import { common } from '../css';

export const Heading = styled.h1`
  ${common}
  font-family: 'Arizonia', sans-serif;
  font-size: 28px;
  text-align: ${props => (props.center ? 'center' : props.right ? 'right' : 'left')}
`;

Heading.propTypes = {
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
};

Heading.defaultPropTypes = {
  left: false,
  center: false,
  right: false,
};
