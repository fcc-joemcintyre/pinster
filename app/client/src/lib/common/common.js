import PropTypes from 'prop-types';
import { css } from '@emotion/react';

export const common = (props) => css`
  margin: ${props.m};
  margin-top: ${props.mt};
  margin-bottom: ${props.mb};
  margin-left: ${props.ml};
  margin-right: ${props.mr};
  padding: ${props.p};
  padding-top: ${props.pt};
  padding-bottom: ${props.pb};
  padding-left: ${props.pl};
  padding-right: ${props.pr};
  height: ${props.h};
  max-height: ${props.maxh};
  min-height: ${props.minh};
  width:  ${props.w};
  max-width:  ${props.maxw};
  min-width:  ${props.minw};
  color: ${props.c};
  background-color: ${props.bg};
`;

common.PropTypes = {
  m: PropTypes.string,
  mt: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
  mr: PropTypes.string,
  p: PropTypes.string,
  pt: PropTypes.string,
  pb: PropTypes.string,
  pl: PropTypes.string,
  pr: PropTypes.string,
  h: PropTypes.string,
  minh: PropTypes.string,
  maxh: PropTypes.string,
  w: PropTypes.string,
  minw: PropTypes.string,
  maxw: PropTypes.string,
  c: PropTypes.string,
  bg: PropTypes.string,
};
