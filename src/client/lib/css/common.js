import PropTypes from 'prop-types';
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
  max-height: ${props => props.maxh};
  min-height: ${props => props.minh};
  width:  ${props => props.w};
  max-width:  ${props => props.maxw};
  min-width:  ${props => props.minw};
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
};
