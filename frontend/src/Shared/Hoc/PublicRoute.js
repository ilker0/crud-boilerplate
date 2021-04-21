import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from 'Shared/Utils';

export const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
