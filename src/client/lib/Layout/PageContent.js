import PropTypes from 'prop-types';
import styled from 'styled-components';

export const PageContent = styled.div`
  max-width: ${props => props.maxWidth};
  margin: 0 auto;
  padding: 100px 0px 16px 0px;
  overflow: auto;
`;

PageContent.propTypes = {
  maxWidth: PropTypes.string,
};

PageContent.defaultProps = {
  maxWidth: '768px',
};
