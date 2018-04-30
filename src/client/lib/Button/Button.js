import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darker } from '../css';
import { size } from './size';

/* eslint-disable indent */
export const Button = styled.button`
  ${size}
  border-radius: 4px;
  cursor: pointer;
  ${props => (props.primary ? `
    color: ${props.fg || props.theme.buttonPrimaryColor || '#ffffff'};
    background-color: ${props.bg || props.theme.buttonPrimaryBG || '#0000ff'};
    border: 1px solid ${props.bg || props.theme.buttonPrimaryBG || '#0000ff'};
  ` : `
    color: ${props.fg || props.theme.buttonColor || '#ffffff'};
    background-color: ${props.bg || props.theme.buttonBG || '#00007f'};
    border: 1px solid ${props.bg || props.theme.buttonBG || '#00007f'};
  `)};

  &:hover {
    background-color: ${(props) => {
      let bg = props.bg;
      if (bg) {
        if (bg === 'transparent') {
          bg = '#ffffff';
        }
      } else {
        bg = (props.primary) ? props.theme.buttonPrimaryBG || '#0000ff' : props.theme.buttonBG || '#00007f';
      }
      return darker (bg, 10);
    }};
  }
`;
/* eslint-enable indent */

Button.propTypes = {
  primary: PropTypes.bool,
  fg: PropTypes.string,
  bg: PropTypes.string,
  ...size.propTypes,
};

Button.defaultProps = {
  primary: false,
  fg: null,
  bg: null,
  ...size.defaultProps,
};
