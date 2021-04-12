import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';

export const AuthRoute = ({ component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(routeProps) => {
      if (authenticated) {
        return React.createElement (component, routeProps);
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

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};
