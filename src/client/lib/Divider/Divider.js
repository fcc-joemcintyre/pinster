import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { common } from '../css';

export const Divider = styled.hr`
  ${common}
  ${({ extend }) => extend && css`
    margin-left: -${extend};
    margin-right: -${extend};
  `};
  ${({ color }) => color};
`;

Divider.propTypes = {
  extend: PropTypes.string,
  color: PropTypes.string,
};

Divider.defaultProps = {
  extend: null,
  color: null,
};
