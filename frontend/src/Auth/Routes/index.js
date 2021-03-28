import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginPage } from 'Auth/Pages/Login';

export default ({ match }) => {
  const { url } = match;

  return (
    <Switch>
      <Route path={`${url}/`} component={LoginPage} />
      <Route path={`${url}/login`} component={LoginPage} />
    </Switch>
  );
};
