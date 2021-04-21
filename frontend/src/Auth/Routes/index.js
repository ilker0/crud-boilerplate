import React from 'react';
import { Switch } from 'react-router-dom';
import { LoginPage } from 'Auth/Pages/Login';
import { ResetPasswordPage } from 'Auth/Pages/ResetPassword';
import { PublicRoute } from 'Shared/Hoc';

export default ({ match }) => {
  const { url } = match;

  return (
    <Switch>
      <PublicRoute path={`${url}/`} component={LoginPage} />
      <PublicRoute path={`${url}/login`} component={LoginPage} />
      <PublicRoute
        path={`${url}/reset-password`}
        component={ResetPasswordPage}
      />
    </Switch>
  );
};
