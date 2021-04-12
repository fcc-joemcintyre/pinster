import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const PlainLink = styled (Link)`
  text-decoration: none;
  ${({ c }) => c && `
    color: ${c};
    &:visited: {
      color: ${c}
    }
  `};
`;
