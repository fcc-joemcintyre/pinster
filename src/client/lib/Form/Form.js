import PropTypes from 'prop-types';
import styled from 'styled-components';
import { common } from '../css';

export const Form = styled.form`
  max-width: 100%;
  ${common}
  ${({ center }) => center && `
    margin-left: auto;
    margin-right: auto;
  `}
`;

Form.propTypes = {
  center: PropTypes.bool,
};

Form.defaultProps = {
  center: undefined, // eslint-disable-line no-undefined
};
