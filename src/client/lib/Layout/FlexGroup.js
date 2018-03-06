import PropTypes from 'prop-types';
import styled from 'styled-components';
import { common } from '../css';

export const FlexGroup = styled.div`
  ${common}
  display: flex;
  flex-wrap: wrap;
  margin: ${props => `0 -${props.spacing}`};
  justify-content: ${props => (props.center ? 'center' : props.right ? 'flex-end' : 'flex-start')};

  > * {
    margin: ${props => `${props.spacing} ${props.spacing} 0px ${props.spacing}`};
  }
`;

FlexGroup.propTypes = {
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
  spacing: PropTypes.string,
};

FlexGroup.defaultProps = {
  left: false,
  center: false,
  right: false,
  spacing: '10px',
};
