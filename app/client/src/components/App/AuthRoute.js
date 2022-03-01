import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

export const AuthRoute = ({ children }) => {
  const authenticated = useSelector ((a) => a.user.authenticated);
  const location = useLocation ();

  if (!authenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
