import PropTypes from 'prop-types';
import { css } from '@emotion/react';

export const size = (props) => css`
  font-size: 16px;
  padding: 6px 12px;

  ${props.small && css`
    font-size: 12px;
    padding: 2px 4px;
  `};
  ${props.medium && css`
    font-size: 14px;
    padding: 2px 6px;
  `};
  ${props.large && css`
    font-size: 18px;
    width: 100%;
    padding: 6px 12px;
  `};
`;

size.propTypes = {
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
};

size.defaultProps = {
  small: false,
  medium: false,
  large: false,
};
