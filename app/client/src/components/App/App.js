import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider as ThemeProviderLegacy } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { getTheme, theme as themeLegacy } from './theme';
import { GlobalStyle } from './GlobalStyle';
import { AuthRoute } from './AuthRoute';
import { verifyLogin } from '../../store/userActions';
import { setPins } from '../../store/appActions';
import { Header } from './Header';
import { ScrollToTop } from './ScrollToTop';
import { Page, Box } from '../../lib/Layout';

import { HomePage } from '../HomePage';
import { Register } from '../register';
import { Login } from '../login';
import { Logout } from '../logout';
import { PinnedPage } from '../PinnedPage';
import { UserPinsPage } from '../UserPinsPage';
import { ManagePinsPage } from '../ManagePinsPage';
import { AddPin, EditPin } from '../EditPin';
import { About } from '../about';
import { NotFoundPage } from './NotFoundPage';

const theme = getTheme ();

export const App = () => {
  const dispatch = useDispatch ();
  const [loading, setLoading] = useState (true);
  const authenticated = useSelector ((a) => a.user.authenticated);

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
      <ThemeProviderLegacy theme={themeLegacy}>
        <>
          <GlobalStyle />
          <Page>
            <Header menu={false} />
            <Box mt='120px' center>Loading ...</Box>
          </Page>
        </>
      </ThemeProviderLegacy>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop>
        <ThemeProviderLegacy theme={themeLegacy}>
          <>
            <GlobalStyle />
            <Page>
              <Header menu />
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/register'>
                  <ThemeProvider theme={theme}>
                    <>
                      <CssBaseline />
                      <Register />
                    </>
                  </ThemeProvider>
                </Route>
                <Route exact path='/login'>
                  <ThemeProvider theme={theme}>
                    <>
                      <CssBaseline />
                      <Login />
                    </>
                  </ThemeProvider>
                </Route>
                <Route exact path='/logout'>
                  <ThemeProvider theme={theme}>
                    <>
                      <CssBaseline />
                      <Logout />
                    </>
                  </ThemeProvider>
                </Route>
                <AuthRoute exact path='/pinned' authenticated={authenticated} component={PinnedPage} />
                <Route exact path='/pins/:_id' component={UserPinsPage} />
                <AuthRoute exact path='/manage' authenticated={authenticated} component={ManagePinsPage} />
                <AuthRoute exact path='/add' authenticated={authenticated} component={AddPin} />
                <AuthRoute exact path='/edit/:_id' authenticated={authenticated} component={EditPin} />
                <Route exact path='/about'>
                  <ThemeProvider theme={theme}>
                    <>
                      <CssBaseline />
                      <About />
                    </>
                  </ThemeProvider>
                </Route>
                <Route path='*' component={NotFoundPage} />
              </Switch>
            </Page>
          </>
        </ThemeProviderLegacy>
      </ScrollToTop>
    </BrowserRouter>
  );
};
