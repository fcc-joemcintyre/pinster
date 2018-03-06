import PropTypes from 'prop-types';
import styled from 'styled-components';
import { common } from '../css';

export const MinorHeading = styled.h3`
  ${common}
  font-family: 'Arizonia', sans-serif;
  font-size: 16px;
  text-align: ${props => (props.center ? 'center' : props.right ? 'right' : 'left')}
`;

MinorHeading.propTypes = {
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
};

MinorHeading.defaultPropTypes = {
  left: false,
  center: false,
  right: false,
};
