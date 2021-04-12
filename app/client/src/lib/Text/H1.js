import PropTypes from 'prop-types';
import styled from 'styled-components';
import { common } from '../css';

export const H1 = styled.h1`
  ${common}
  ${({ theme }) => (theme && theme.fonts && theme.fonts.h1) || `
    font-family: sans-serif;
    font-size: 30px;
    line-height: 1.4;
    margin: 0 0 10px 0;
  `};
  text-align: ${(props) => (props.center ? 'center' : props.right ? 'right' : props.left ? 'left' : null)};
`;

H1.propTypes = {
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
};

H1.defaultPropTypes = {
  left: false,
  center: false,
  right: false,
};
