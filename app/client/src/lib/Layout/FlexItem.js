import styled from '@emotion/styled';
import { common } from '../common';

export const FlexItem = styled.div`
  ${common}
  flex: ${({ grow }) => (grow ? 1 : 0)} ${({ shrink }) => (shrink ? 1 : 0)} ${({ size }) => size || 'auto'};
`;
