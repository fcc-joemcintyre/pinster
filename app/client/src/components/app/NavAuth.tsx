import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { AppBar, Button, Drawer, IconButton, List, ListItemText, ListItem,
  Toolbar, Typography, useMediaQuery }
  from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const items = [
  { key: 1, text: 'Pinned', to: '/pinned', exact: true, when: 0 },
  { key: 2, text: 'Manage', to: '/manage', exact: true, when: 0 },
  { key: 4, text: 'About', to: '/about', exact: true, when: 0 },
  { key: 5, text: 'Logout', to: '/logout', exact: true, when: 0 },
];

export const NavAuth = () => {
  const mobile = useMediaQuery ('(max-width: 767px)');
  return mobile ? <MobileNav /> : <DesktopNav />;
};

const MobileNav = () => {
  const navigate = useNavigate ();
  const [drawer, setDrawer] = useState (false);
  const path = useLocation ().pathname;

  const onToggleDrawer = (open) => (e) => {
    // ignore if tab or shift keys to allow keyboard navigation
    if (!((e.type === 'keydown') && (e.key === 'Tab' || e.key === 'Shift'))) {
      setDrawer (open);
    }
  };

  const menus = (
    <List sx={{ backgroundColor: '#000', height: '100%' }}>
      {items.map ((a) => (
        <Link key={a.key} to={a.to} style={{ textDecoration: 'none' }}>
          <ListItem button selected={path === a.to}>
            <ListItemText sx={{ color: 'white' }}>{a.text}</ListItemText>
          </ListItem>
        </Link>
      ))}
    </List>
  );

  return (
    <>
      <AppBar position='fixed'>
        <StyledToolbar>
          <Title onClick={() => navigate ('/')}>
            Pinster
          </Title>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={onToggleDrawer (true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant='temporary'
            anchor='right'
            open={drawer}
            onClose={onToggleDrawer (false)}
          >
            <Toolbar sx={{ backgroundColor: (theme) => theme.palette.primary.main }} />
            <div
              role='presentation'
              style={{ height: '100%' }}
              onClick={onToggleDrawer (false)}
              onKeyDown={onToggleDrawer (false)}
            >
              {menus}
            </div>
          </Drawer>
        </StyledToolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

const DesktopNav = () => {
  const navigate = useNavigate ();

  return (
    <>
      <AppBar position='fixed'>
        <StyledToolbar>
          <div>
            <Title onClick={() => navigate ('/')}>
              Pinster
            </Title>
          </div>
          <div>
            { items.map ((a) => (
              <Link key={a.key} to={a.to} style={{ textDecoration: 'none' }}>
                <Button variant='text' sx={{ color: '#fff' }}>{a.text}</Button>
              </Link>
            ))}
          </div>
        </StyledToolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

const StyledToolbar = styled (Toolbar)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 4px;
`;

const Title = styled (Typography)`
  font-size: 30px;
  vertical-align: top;
  text-shadow: 1px 1px 1px #3333ff;
  line-height: 1.0;
  cursor: pointer;
`;
