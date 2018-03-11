import PropTypes from 'prop-types';
import styled from 'styled-components';
import { common } from '../css';

export const Box = styled.div`
  ${common}
  ${({ inline }) => inline && `
    display: inline-block;
  `};
  ${({ center }) => center && `
    margin-left: auto;
    margin-right: auto;
  `};
  ${({ bg }) => bg && `
    background-color: ${bg}
  `};
`;

Box.propTypes = {
  inline: PropTypes.bool,
  center: PropTypes.bool,
  bg: PropTypes.string,
};

Box.defaultProps = {
  inline: null,
  center: null,
  bg: null,
};
