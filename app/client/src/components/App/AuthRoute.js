import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router';

export const AuthRoute = ({ children, ...rest }) => {
  const authenticated = useSelector ((a) => a.user.authenticated);
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (authenticated) {
          return children;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: routeProps.location },
              }}
            />
          );
        }
      }}
    />
  );
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
