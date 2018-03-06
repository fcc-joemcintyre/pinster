import styled from 'styled-components';
import PropTypes from 'prop-types';
import { common } from '../css';

export const Absolute = styled.div`
  ${common}
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
`;

Absolute.propTypes = {
  top: PropTypes.oneOf ([PropTypes.string, PropTypes.number]),
  left: PropTypes.oneOf ([PropTypes.string, PropTypes.number]),
  right: PropTypes.oneOf ([PropTypes.string, PropTypes.number]),
  bottom: PropTypes.oneOf ([PropTypes.string, PropTypes.number]),
};
