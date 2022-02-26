import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { common } from '../common';

export const Box = styled.div`
  ${common}
  ${({ inline }) => inline && `
    display: inline-block;
  `}
  ${({ center }) => center && `
    margin-left: auto;
    margin-right: auto;
  `}
  ${({ b }) => b && `
    border: ${b};
  `}
  ${({ br }) => br && `
    border-radius: ${br};
  `}
`;

Box.propTypes = {
  inline: PropTypes.bool,
  center: PropTypes.bool,
  bg: PropTypes.string,
  b: PropTypes.string,
  br: PropTypes.string,
};

Box.defaultProps = {
  inline: null,
  center: null,
  bg: null,
  b: null,
  br: null,
};
