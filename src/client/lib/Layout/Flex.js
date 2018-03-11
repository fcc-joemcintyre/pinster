import PropTypes from 'prop-types';
import styled from 'styled-components';
import { common } from '../css';

export const Flex = styled.div`
  ${common}
  display: flex;
  ${({ wraps }) => wraps && `
    flex-wrap: wrap;
  `};
`;

Flex.propTypes = {
  wraps: PropTypes.bool,
};

Flex.defaultProps = {
  wraps: null,
};
