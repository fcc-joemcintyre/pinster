import styled from 'styled-components';
import { common } from '../css';

export const Fixed = styled.div`
  ${common}
  position: fixed;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  z-index: 100;
`;
