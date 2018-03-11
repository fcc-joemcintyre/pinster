import PropTypes from 'prop-types';
import styled from 'styled-components';
import { common } from '../css';

export const SubHeading = styled.h2`
  ${common}
  ${({ theme, bold }) => (theme ? `
    font-family: ${theme.headingFont || theme.font}, sans-serif;
    font-size: ${(theme.headingSize && theme.headingSize[2]) || '30px'};
    font-weight: ${(theme.headingWeight && (bold ? theme.headingWeight[1] : theme.headingWeight[0])) || 'bold'};
  ` : `
    font-family: sans-serif;
    font-size: 30px;
    font-weight: ${bold ? 'bold' : 'normal'};
  `)};
  line-height: 1.2;
  text-align: ${props => (props.center ? 'center' : props.right ? 'right' : 'left')}
`;

SubHeading.propTypes = {
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
  bold: PropTypes.bool,
};

SubHeading.defaultPropTypes = {
  left: false,
  center: false,
  right: false,
  bold: false,
};
