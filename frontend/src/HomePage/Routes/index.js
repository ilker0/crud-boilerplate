import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HomePage } from 'HomePage/Pages';

export default ({ match }) => {
  const { url } = match;

  return (
    <Switch>
      <Route path={`${url}/`} component={HomePage} />
      <Redirect to="/404" />
    </Switch>
  );
};
