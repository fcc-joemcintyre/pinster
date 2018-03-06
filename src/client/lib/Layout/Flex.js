import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { common } from '../css';

export const Flex = styled.div`
  ${common}
  display: flex;
  ${({ wrap }) => wrap && css`
    flex-wrap: wrap;
  `};
`;

Flex.propTypes = {
  wrap: PropTypes.bool,
};

Flex.defaultProps = {
  wrap: null,
};
