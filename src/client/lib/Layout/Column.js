import styled from 'styled-components';
import { common } from '../css';

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
