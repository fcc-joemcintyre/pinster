import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
/** @typedef { import ('../../store/configureStore').RootState } RootState */
import { logout } from '../../store/userActions';
import { PageContent } from '../util';

export const Logout = () => {
  const dispatch = useDispatch ();
  const authenticated = useSelector ((/** @type RootState */ a) => a.user.authenticated);
  const [working, setWorking] = useState (true);

  useEffect (() => {
    async function q () {
      await dispatch (logout ());
      setWorking (false);
    }
    q ();
  }, [dispatch]);

  return (
    <PageContent>
      {working ? (
        <Typography textAlign='center'>
          Logging out ...
        </Typography>
      ) : (
        authenticated ? (
          <Typography textAlign='center'>
            Logging out did not complete, please retry or close your browser.
          </Typography>
        ) : (
          <Typography textAlign='center'>
            Thank you for using Pinster, we hope to see you back again soon.
          </Typography>
        )
      )}
    </PageContent>
  );
};
