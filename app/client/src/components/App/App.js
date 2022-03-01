import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, ThemeProvider, Typography } from '@mui/material';

import { verifyLogin } from '../../store/userActions';
import { setPins } from '../../store/appActions';

import { Home } from '../home';
import { Register } from '../register';
import { Login } from '../login';
import { Logout } from '../logout';
import { AddPin, EditPin, Pinned } from '../pins';
import { Manage } from '../manage';
import { About } from '../about';

import { getTheme } from './theme';
import { AuthRoute } from './AuthRoute';
import { NavAuth } from './NavAuth';
import { NavUnauth } from './NavUnauth';
import { NotFoundPage } from './NotFoundPage';
import { ScrollToTop } from './ScrollToTop';

const theme = getTheme ();

export const App = () => {
  const dispatch = useDispatch ();
  const authenticated = useSelector ((a) => a.user.authenticated);
  const [loading, setLoading] = useState (true);

  useEffect (() => {
    async function q () {
      await dispatch (verifyLogin ());
      await dispatch (setPins ());
      setLoading (false);
    }
    q ();
  }, [dispatch]);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <>
          <CssBaseline />
          <Typography textAlign='center'>Loading ...</Typography>
        </>
      </ThemeProvider>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop>
        <ThemeProvider theme={theme}>
          <>
            <CssBaseline />
            { authenticated ? <NavAuth /> : <NavUnauth /> }
            <Switch>
              <Route exact path='/'><Home /></Route>
              <Route exact path='/register'><Register /></Route>
              <Route exact path='/login'><Login /></Route>
              <Route exact path='/logout'><Logout /></Route>
              <AuthRoute exact path='/pinned'><Pinned /></AuthRoute>
              <AuthRoute exact path='/manage'><Manage /></AuthRoute>
              <AuthRoute exact path='/add'><AddPin /></AuthRoute>
              <AuthRoute exact path='/edit/:key'><EditPin /></AuthRoute>
              <Route exact path='/about'><About /></Route>
              <Route path='*'><NotFoundPage /></Route>
            </Switch>
          </>
        </ThemeProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
};
