import PropTypes from 'prop-types';
import styled from 'styled-components';
import { common } from '../css';

export const H2 = styled.h2`
  ${common}
  ${({ theme }) => (theme && theme.fonts && theme.fonts.h2) || `
    font-family: sans-serif;
    font-size: 26px;
    line-height: 1.4;
    margin: 0 0 10px 0;
  `};
  text-align: ${props => (props.center ? 'center' : props.right ? 'right' : props.left ? 'left' : null)};
`;

H2.propTypes = {
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
};

H2.defaultPropTypes = {
  left: false,
  center: false,
  right: false,
};
