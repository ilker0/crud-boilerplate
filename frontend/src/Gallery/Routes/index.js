import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { GalleryList } from 'Gallery/Pages';

export default ({ match }) => {
  const { url } = match;

  return (
    <Switch>
      <Route path={`${url}/`} component={GalleryList} />
      <Redirect to="/404" />
    </Switch>
  );
};
