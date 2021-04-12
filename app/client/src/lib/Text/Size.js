import PropTypes from 'prop-types';
import { css } from 'styled-components';

export const Size = css`
  font-size: ${({ theme }) => (theme && theme.fontSize && theme.fontSize[3]) || '16px'};
  ${({ theme, small }) => small && `
    font-size: ${(theme && theme.fontSize && theme.fontSize[2]) || '14px'};
  `};
  ${({ theme, xsmall }) => xsmall && `
    font-size: ${(theme && theme.fontSize && theme.fontSize[1]) || '12px'};
  `};
  ${({ theme, xxsmall }) => xxsmall && `
    font-size: ${(theme && theme.fontSize && theme.fontSize[0]) || '11px'};
  `};
  ${({ theme, large }) => large && `
    font-size: ${(theme && theme.fontSize && theme.fontSize[4]) || '18px'};
  `};
  ${({ theme, xlarge }) => xlarge && `
    font-size: ${(theme && theme.fontSize && theme.fontSize[5]) || '22px'};
  `};
  ${({ theme, xxlarge }) => xxlarge && `
    font-size: ${(theme && theme.fontSize && theme.fontSize[6]) || '26px'};
  `};
`;

Size.propTypes = {
  small: PropTypes.bool,
  xsmall: PropTypes.bool,
  xxsmall: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,
  xxlarge: PropTypes.bool,
};

Size.defaultProps = {
  small: false,
  xsmaller: false,
  xxsmallest: false,
  large: false,
  xlarge: false,
  xxlarge: false,
};
