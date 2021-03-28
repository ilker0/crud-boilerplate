import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CategoryList } from 'Categories/Pages';

export default ({ match }) => {
  const { url } = match;

  return (
    <Switch>
      <Route path={`${url}/`} component={CategoryList} />
    </Switch>
  );
};
