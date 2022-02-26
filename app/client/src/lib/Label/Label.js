import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { common } from '../common';

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
