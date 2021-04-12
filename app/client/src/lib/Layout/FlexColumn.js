import PropTypes from 'prop-types';
import styled from 'styled-components';
import { common } from '../css';

export const FlexColumn = styled.div`
  ${common}
  display: flex;
  flex-direction: column;
  > * {
    margin-top: ${(props) => props.gap};
    &:first-child {
      margin-top: 0;
    }
  }
`;

FlexColumn.propTypes = {
  gap: PropTypes.string,
};

FlexColumn.defaultProps = {
  gap: '20px',
};
