import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Profile } from 'Profile/Pages';

export default ({ match }) => {
  const { url } = match;

  return (
    <Switch>
      <Route path={`${url}/`} component={Profile} />
      <Redirect to="/404" />
    </Switch>
  );
};
