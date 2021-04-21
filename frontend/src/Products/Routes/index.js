import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ProductList } from 'Products/Pages';

export default ({ match }) => {
  const { url } = match;

  return (
    <Switch>
      <Route path={`${url}/`} component={ProductList} />
      <Redirect to="/404" />
    </Switch>
  );
};
