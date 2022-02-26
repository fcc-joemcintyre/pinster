import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { common } from '../common';

export const Form = styled.form`
  min-width: 300px;
  max-width: 768px;
  ${common}
  ${({ center }) => center && `
    margin-left: auto;
    margin-right: auto;
  `}

  > * {
    margin-top: ${(props) => props.gap};
    &:first-child {
      margin-top: 0;
    }
  }
`;

Form.propTypes = {
  center: PropTypes.bool,
  gap: PropTypes.string,
};

Form.defaultProps = {
  center: false,
  gap: '10px',
};
