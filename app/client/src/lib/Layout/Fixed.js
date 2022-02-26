import styled from '@emotion/styled';
import { common } from '../common';

export const Fixed = styled.div`
  ${common};
  position: fixed;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  z-index: 100;
`;
