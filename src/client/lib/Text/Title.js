import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Title = styled.h1`
  ${({ theme, bold }) => (theme ? `
    font-family: ${theme.headingFont || theme.font}, sans-serif;
    font-size: ${(theme.headingSize && theme.headingSize[0]) || '30px'};
    font-weight: ${(theme.headingWeight && (bold ? theme.headingWeight[1] : theme.headingWeight[0])) || 'bold'};
  ` : `
    font-family: sans-serif;
    font-size: 30px;
    font-weight: ${bold ? 'bold' : 'normal'};
  `)};
  line-height: 1.0;
`;

Title.propTypes = {
  bold: PropTypes.bool,
};

Title.defaultPropTypes = {
  bold: false,
};
