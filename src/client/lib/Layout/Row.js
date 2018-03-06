import PropTypes from 'prop-types';
import styled from 'styled-components';
import { common } from '../css';

export const Row = styled.div`
  ${common}
  text-align: ${props => (props.center ? 'center' : props.right ? 'right' : 'left')};
`;

Row.propTypes = {
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
};

Row.defaultProps = {
  left: false,
  center: false,
  right: false,
};
