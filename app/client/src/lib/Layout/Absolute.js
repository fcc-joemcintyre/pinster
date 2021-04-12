import styled from 'styled-components';
import PropTypes from 'prop-types';
import { common } from '../css';

export const Absolute = styled.div`
  ${common}
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
`;

Absolute.propTypes = {
  top: PropTypes.oneOfType ([PropTypes.string, PropTypes.number]),
  left: PropTypes.oneOfType ([PropTypes.string, PropTypes.number]),
  right: PropTypes.oneOfType ([PropTypes.string, PropTypes.number]),
  bottom: PropTypes.oneOfType ([PropTypes.string, PropTypes.number]),
};
