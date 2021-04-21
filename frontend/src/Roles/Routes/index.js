import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RoleList } from 'Roles/Pages';

export default ({ match }) => {
  const { url } = match;

  return (
    <Switch>
      <Route path={`${url}/`} component={RoleList} />
      <Redirect to="/404" />
    </Switch>
  );
};
