import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
/** @typedef { import ('../../store/configureStore').RootState } RootState */

export const AuthRoute = ({ children }) => {
  const authenticated = useSelector ((/** @type RootState */ a) => a.user.authenticated);
  const location = useLocation ();

  if (!authenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
