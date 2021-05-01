import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Settings } from 'Settings/Pages';

export default ({ match }) => {
  const { url } = match;

  return (
    <Switch>
      <Route path={`${url}/`} component={Settings} />
      <Redirect to="/404" />
    </Switch>
  );
};
