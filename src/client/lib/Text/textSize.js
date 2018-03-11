import PropTypes from 'prop-types';
import { css } from 'styled-components';

export const size = css`
  font-size: ${({ theme }) => (theme && theme.fontSize && theme.fontSize[3]) || '16px'};
  ${({ theme, small }) => small && `
    font-size: ${(theme && theme.fontSize && theme.fontSize[2]) || '14px'};
  `};
  ${({ theme, smaller }) => smaller && `
    font-size: ${(theme && theme.fontSize && theme.fontSize[1]) || '12px'};
  `};
  ${({ theme, smallest }) => smallest && `
    font-size: ${(theme && theme.fontSize && theme.fontSize[0]) || '11px'};
  `};
`;

size.propTypes = {
  small: PropTypes.bool,
  smaller: PropTypes.bool,
  smallest: PropTypes.bool,
};

size.defaultProps = {
  small: false,
  smaller: false,
  smallest: false,
};
