import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { common } from '../common';

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
