import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Text = styled.div`
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  font-size: ${({ fs }) => fs};
`;

Text.propTypes = {
  inline: PropTypes.bool,
  fs: PropTypes.string,
};

Text.defaultProps = {
  inline: false,
  fs: null,
};
