import PropTypes from 'prop-types';
import styled from 'styled-components';
import { common } from '../css';

export const FlexGroup = styled.div`
  ${common}
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => (props.center ? 'center' : props.right ? 'flex-end' : 'flex-start')};

  ${({ center, spacing, mt, mb }) => (center ?
    `
      > * {
        margin: ${spacing};
      }
    ` : `
      margin: ${mt || '0'} -${spacing} ${mb || '0'} -${spacing};

      > * {
        margin: ${spacing} ${spacing} 0px ${spacing}};
      }
    `
  )}
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
