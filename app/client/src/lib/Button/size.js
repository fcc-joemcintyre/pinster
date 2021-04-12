import PropTypes from 'prop-types';
import { css } from 'styled-components';

export const size = css`
  font-size: 16px;
  padding: 6px 12px;

  ${({ small }) => small && css`
    font-size: 12px;
    padding: 2px 4px;
  `};
  ${({ medium }) => medium && css`
    font-size: 14px;
    padding: 2px 6px;
  `};
  ${({ large }) => large && css`
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
