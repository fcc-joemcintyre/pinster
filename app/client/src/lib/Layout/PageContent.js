import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export const PageContent = styled.div`
  max-width: ${(props) => props.maxw || (props.theme && props.theme.contentWidth) || '768px'};
  margin: 0 auto;
  padding: ${(props) => props.p || (props.theme && props.theme.contentPadding) || '0 0 0 0'};
  overflow: auto;
`;

PageContent.propTypes = {
  p: PropTypes.string,
  maxw: PropTypes.string,
};

PageContent.defaultProps = {
  p: null,
  maxw: null,
};
