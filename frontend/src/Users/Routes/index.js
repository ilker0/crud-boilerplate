import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserList } from 'Users/Pages';

export default ({ match }) => {
  const { url } = match;

  return (
    <Switch>
      <Route path={`${url}/`} component={UserList} />
    </Switch>
  );
};
