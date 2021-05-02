import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserActionList } from 'UserActions/Pages';

export default ({ match }) => {
  const { url } = match;

  return (
    <Switch>
      <Route path={`${url}/`} component={UserActionList} />
      <Redirect to="/404" />
    </Switch>
  );
};
