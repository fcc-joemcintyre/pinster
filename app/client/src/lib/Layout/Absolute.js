import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { common } from '../common';

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
