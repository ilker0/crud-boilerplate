import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CategoryList } from 'Categories/Pages';

export default ({ match }) => {
  const { url } = match;

  return (
    <Switch>
      <Route path={`${url}/`} component={CategoryList} />
      <Redirect to="/404" />
    </Switch>
  );
};
