import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { common } from '../css';

export const Box = styled.div`
  ${common}
  ${({ inline }) => inline && css`
    display: inline-block;
  `};
  ${({ center }) => center && css`
    margin-left: auto;
    margin-right: auto;
  `};
  ${({ bg }) => bg && css`
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
