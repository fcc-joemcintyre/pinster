import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { common } from '../common';

export const Divider = styled.div`
  ${common}
  border: ${({ h, pattern, color }) => `calc(${h} / 2) ${pattern} ${color}`};
  ${({ extend }) => extend && `
    margin-left: -${extend};
    margin-right: -${extend};
  `};
`;

Divider.propTypes = {
  h: PropTypes.string,
  color: PropTypes.string,
  pattern: PropTypes.string,
  extend: PropTypes.string,
};

Divider.defaultProps = {
  h: '1px',
  color: '#444444',
  pattern: 'solid',
  extend: null,
};
