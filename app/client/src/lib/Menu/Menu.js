import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { common, darker } from '../css';
import { DropMenuImpl } from './DropMenuImpl'; // eslint-disable-line
import { SubMenuImpl } from './SubMenuImpl'; // eslint-disable-line

export const MenuBar = styled.div`
  ${common}
  display: flex;
  margin-left: ${(props) => (props.right ? 'auto' : 0)};
`;

const item = css`
  ${(props) => props.theme.menuText}
  position: relative;
  margin-right: 10px;
  white-space: nowrap;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
  &:hover {
    ${(props) => props.theme.menuTextHover};
  }
  &.active {
    ${(props) => props.theme.menuTextActive};
  }
`;

export const MenuItem = styled.div`
  ${item};
`;

export const SubMenu = styled (SubMenuImpl)`
  ${item};
`;

export const MenuNavLink = styled (NavLink)`
  ${item};
  text-decoration: none;
`;

export const MenuSeparator = styled.hr`
  margin-top: ${(props) => props.spacing || '4px'};
  margin-bottom: ${(props) => props.spacing || '4px'};
`;

export const MenuSpacer = styled.div`
  position: absolute;
  z-index: 20;
  top: 100%;
  left: ${(props) => (props.right ? null : 0)};
  right: ${(props) => (props.right ? 0 : null)};
  width: 100%;
  min-width: 100px;
  height: ${(props) => (props.h || '8px')};
`;

export const MenuFloating = styled.div`
  position: absolute;
  z-index: 20;
  top: calc(100% + ${(props) => props.top || '8px'});
  left: ${(props) => (props.right ? null : 0)};
  right: ${(props) => (props.right ? 0 : null)};
  border: 1px solid #333333;
  border-top: transparent;
  background-color: ${(props) => props.theme.menuColor};

  > a {
    display: block;
    margin: 0;
    width: 100%;
    overflow: hidden;
    padding: 6px 20px;
    &:hover {
      background-color: ${(props) => darker (props.theme.menuColor)};
    }
  }
`;

export const DropMenu = styled (DropMenuImpl)`
  ${common}
  display: inline-block;
`;

export const DropMenuSpacer = styled (MenuSpacer)`
  height: 0px;
`;

export const DropMenuFloating = styled (MenuFloating)`
  top: 100%;
`;
