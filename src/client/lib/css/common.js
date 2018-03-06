import { css } from 'styled-components';

export const common = css`
  margin: ${props => props.m};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  margin-left: ${props => props.ml};
  margin-right: ${props => props.mr};
  padding: ${props => props.p};
  padding-top: ${props => props.pt};
  padding-bottom: ${props => props.pb};
  padding-left: ${props => props.pl};
  padding-right: ${props => props.pr};
  height: ${props => props.h};
  max-height: ${props => props.mh};
  width:  ${props => props.w};
  max-width:  ${props => props.mw};
`;
