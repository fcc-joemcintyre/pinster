import PropTypes from 'prop-types';
import styled from 'styled-components';
import { size } from './textSize';

export const Text = styled.div`
  ${size}
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
`;

Text.propTypes = {
  inline: PropTypes.bool,
};

Text.defaultProps = {
  inline: false,
};
