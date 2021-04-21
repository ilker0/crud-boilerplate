import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { LoginPage } from 'Auth/Pages/Login';
import { ResetPasswordPage } from 'Auth/Pages/ResetPassword';
import { PublicRoute } from 'Shared/Hoc';

export default ({ match }) => {
  const { url } = match;

  return (
    <Switch>
      <PublicRoute exact path={`${url}/`} component={LoginPage} />
      <PublicRoute exact path={`${url}/login`} component={LoginPage} />
      <PublicRoute
        exact
        path={`${url}/reset-password`}
        component={ResetPasswordPage}
      />
      <Redirect to="/404" />
    </Switch>
  );
};
