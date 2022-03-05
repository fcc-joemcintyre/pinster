import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useVerifyLoginMutation } from '../../store/api';
import { setPins } from '../../store/appActions';
import { setAuthenticated } from '../../store/userSlice';

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
  const dispatch = useAppDispatch ();
  const authenticated = useAppSelector ((a) => a.user.authenticated);
  const [loading, setLoading] = useState (true);
  const [verifyLogin, { isLoading }] = useVerifyLoginMutation ();

  useEffect (() => {
    async function q () {
      const user = await verifyLogin ().unwrap ();
      await dispatch (setAuthenticated ({ authenticated: user.authenticated, key: user.key }));
      await dispatch (setPins ());
      setLoading (false);
    }
    q ();
  }, [dispatch, verifyLogin]);

  if (isLoading || loading) {
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
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/about' element={<About />} />

              <Route path='/pinned' element={<AuthRoute><Pinned /></AuthRoute>} />
              <Route path='/manage' element={<AuthRoute><Manage /></AuthRoute>} />
              <Route path='/add' element={<AuthRoute><AddPin /></AuthRoute>} />
              <Route path='/edit/:key' element={<AuthRoute><EditPin /></AuthRoute>} />

              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </>
        </ThemeProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
};
