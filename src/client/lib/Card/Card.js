import styled from 'styled-components';
import { common } from '../css';
import { Flex } from '../Layout';

export const Card = styled (Flex)`
  ${common}
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 4px;
`;
