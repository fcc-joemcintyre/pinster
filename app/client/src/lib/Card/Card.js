import styled from '@emotion/styled';
import { common } from '../common';
import { Flex } from '../Layout';

export const Card = styled (Flex)`
  ${common}
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 4px;
`;
