import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { GlobalStyle } from './GlobalStyle';
import { AuthRoute } from './AuthRoute';
import { verifyLogin } from '../../store/userActions';
import { setPins } from '../../store/appActions';
import { Header } from './Header';
import { ScrollToTop } from '../../lib/ScrollToTop';
import { Page, Box } from '../../lib/Layout';

import { HomePage } from '../HomePage';
import { RegisterPage, LoginPage } from '../User';
import { LogoutPage } from '../LogoutPage';
import { PinnedPage } from '../PinnedPage';
import { UserPinsPage } from '../UserPinsPage';
import { ManagePinsPage } from '../ManagePinsPage';
import { AddPin, EditPin } from '../EditPin';
import { AboutPage } from '../AboutPage';
import { NotFoundPage } from './NotFoundPage';

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
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Page>
            <Header menu={false} />
            <Box mt='120px' center>Loading ...</Box>
          </Page>
        </>
      </ThemeProvider>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Page>
              <Header menu />
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/register' component={RegisterPage} />
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/logout' component={LogoutPage} />
                <AuthRoute exact path='/pinned' authenticated={authenticated} component={PinnedPage} />
                <Route exact path='/pins/:_id' component={UserPinsPage} />
                <AuthRoute exact path='/manage' authenticated={authenticated} component={ManagePinsPage} />
                <AuthRoute exact path='/add' authenticated={authenticated} component={AddPin} />
                <AuthRoute exact path='/edit/:_id' authenticated={authenticated} component={EditPin} />
                <Route exact path='/about' component={AboutPage} />
                <Route path='*' component={NotFoundPage} />
              </Switch>
            </Page>
          </>
        </ThemeProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
};
