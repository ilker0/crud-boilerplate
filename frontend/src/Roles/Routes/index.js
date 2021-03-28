import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RoleList } from 'Roles/Pages';

export default ({ match }) => {
  const { url } = match;

  return (
    <Switch>
      <Route path={`${url}/`} component={RoleList} />
    </Switch>
  );
};
