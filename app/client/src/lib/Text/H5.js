import PropTypes from 'prop-types';
import styled from 'styled-components';
import { common } from '../css';

export const H5 = styled.h5`
  ${common}
  ${({ theme }) => (theme && theme.fonts && theme.fonts.h5) || `
    font-family: sans-serif;
    font-size: 18px;
    line-height: 1.2;
    margin: 0 0 10px 0;
  `};
  text-align: ${(props) => (props.center ? 'center' : props.right ? 'right' : props.left ? 'left' : null)};
`;

H5.propTypes = {
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
};

H5.defaultPropTypes = {
  left: false,
  center: false,
  right: false,
};
