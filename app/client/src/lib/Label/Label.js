import PropTypes from 'prop-types';
import styled from 'styled-components';
import { common } from '../css';

export const Label = styled.label`
  ${common}
  &:after {
    content: ${(props) => (props.required) && '" *"'};
  }
`;

Label.propTypes = {
  required: PropTypes.bool,
};

Label.defaultProps = {
  required: false,
};
