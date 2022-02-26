import PropTypes from 'prop-types';
import { css } from '@emotion/react';

export const Size = (props) => css`
  font-size: ${(props.theme && props.theme.fontSize && props.theme.fontSize[3]) || '16px'};
  ${props.small && `
    font-size: ${(props.theme && props.theme.fontSize && props.theme.fontSize[2]) || '14px'};
  `};
  ${props.xsmall && `
    font-size: ${(props.theme && props.theme.fontSize && props.theme.fontSize[1]) || '12px'};
  `};
  ${props.xxsmall && `
    font-size: ${(props.theme && props.theme.fontSize && props.theme.fontSize[0]) || '11px'};
  `};
  ${props.large && `
    font-size: ${(props.theme && props.theme.fontSize && props.theme.fontSize[4]) || '18px'};
  `};
  ${props.xlarge && `
    font-size: ${(props.theme && props.theme.fontSize && props.theme.fontSize[5]) || '22px'};
  `};
  ${props.xxlarge && `
    font-size: ${(props.theme && props.theme.fontSize && props.theme.fontSize[6]) || '26px'};
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
