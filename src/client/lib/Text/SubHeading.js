import PropTypes from 'prop-types';
import styled from 'styled-components';
import { common } from '../css';

export const SubHeading = styled.h2`
  ${common}
  font-family: 'Arizonia', sans-serif;
  font-size: 20px;
  text-align: ${props => (props.center ? 'center' : props.right ? 'right' : 'left')}
`;

SubHeading.propTypes = {
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
};

SubHeading.defaultPropTypes = {
  left: false,
  center: false,
  right: false,
};
