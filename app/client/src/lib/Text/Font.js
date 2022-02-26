import PropTypes from 'prop-types';
import { css } from '@emotion/react';

export const Font = (props) => css`
  ${((props.theme && props.theme.fonts && props.theme.fonts[props.font]) ? props.theme.fonts[props.font] :
    props.theme && props.theme.fonts && props.theme.fonts.global ? props.theme.fonts.global : `
    font-family: sans-serif;
    font-weight: normal;
  `)};
`;

Font.propTypes = {
  font: PropTypes.string,
};

Font.defaultProps = {
  font: null,
};
