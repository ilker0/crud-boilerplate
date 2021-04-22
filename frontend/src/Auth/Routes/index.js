import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { LoginPage } from 'Auth/Pages/Login';
import { ForgotPasswordPage } from 'Auth/Pages/ForgotPassword';
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
        path={`${url}/forgot-password`}
        component={ForgotPasswordPage}
      />
      <PublicRoute
        exact
        path={`${url}/reset-password/:token`}
        component={ResetPasswordPage}
      />
      <Redirect to="/404" />
    </Switch>
  );
};
