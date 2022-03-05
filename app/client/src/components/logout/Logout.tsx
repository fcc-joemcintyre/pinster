import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import { useLogoutMutation } from '../../store/api';
import { setAuthenticated } from '../../store/userSlice';
import { PageContent } from '../util';

export const Logout = () => {
  const dispatch = useAppDispatch ();
  const [logout, { isLoading, isError, isSuccess }] = useLogoutMutation ();

  useEffect (() => {
    async function q () {
      await logout ();
      dispatch (setAuthenticated ({ authenticated: false, key: 0 }));
    }
    q ();
  }, [dispatch, logout]);

  return (
    <PageContent>
      {isLoading ? (
        <Typography textAlign='center'>
          Logging out ...
        </Typography>
      ) : (
        isError ? (
          <Typography textAlign='center'>
            Logging out did not complete, please retry or close your browser.
          </Typography>
        ) : isSuccess ? (
          <Typography textAlign='center'>
            Thank you for using Pinster, we hope to see you back again soon.
          </Typography>
        ) : null
      )}
    </PageContent>
  );
};
