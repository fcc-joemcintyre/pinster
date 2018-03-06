import styled from 'styled-components';
import { common } from '../css';

export const FlexItem = styled.div`
  ${common}
  flex: ${({ grow }) => (grow ? 1 : 0)} ${({ shrink }) => (shrink ? 1 : 0)} ${({ size }) => size || 'auto'};
`;
