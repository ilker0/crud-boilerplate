import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserList } from 'Users/Pages';

export default ({ match }) => {
  const { url } = match;

  return (
    <Switch>
      <Route path={`${url}/`} component={UserList} />
      <Redirect to="/404" />
    </Switch>
  );
};
