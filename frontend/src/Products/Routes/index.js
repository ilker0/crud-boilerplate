import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ProductList } from 'Products/Pages';

export default ({ match }) => {
  const { url } = match;

  return (
    <Switch>
      <Route path={`${url}/`} component={ProductList} />
    </Switch>
  );
};
