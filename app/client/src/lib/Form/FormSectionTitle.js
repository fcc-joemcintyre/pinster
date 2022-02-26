import styled from '@emotion/styled';

export const FormSectionTitle = styled.div`
  ${({ theme }) => (theme && theme.fonts && theme.fonts.h5)};
  margin-top: 20px;
  margin-bottom: 10px;
`;
