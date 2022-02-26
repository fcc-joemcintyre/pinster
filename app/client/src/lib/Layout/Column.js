import styled from '@emotion/styled';
import { common } from '../common';

export const Column = styled.div`
  width: 100%;
  display: inline-block;
  vertical-align: top;
  margin-right: 20px;
  ${common}

  &:last-child {
    margin-right: 0;
  }
`;
