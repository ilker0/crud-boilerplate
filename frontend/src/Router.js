import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import config from 'Config';

// Pages
import { PrivateRoute } from 'Shared/Hoc';
import Auth from 'Auth/Routes';
import Roles from 'Roles/Routes';
import Categories from 'Categories/Routes';
import Products from 'Products/Routes';
import Users from 'Users/Routes';

// Layouts
import { DefaultLayout, NotAuthLayout } from 'Shared/Layouts';

export default () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute
          exact
          path={`${config.pathname}/roles`}
          component={(props) => <DefaultLayout {...props} component={Roles} />}
        />
        <PrivateRoute
          exact
          path={`${config.pathname}/categories`}
          component={(props) => (
            <DefaultLayout {...props} component={Categories} />
          )}
        />
        <PrivateRoute
          exact
          path={`${config.pathname}/products`}
          component={(props) => (
            <DefaultLayout {...props} component={Products} />
          )}
        />
        <PrivateRoute
          exact
          path={`${config.pathname}/users`}
          component={(props) => <DefaultLayout {...props} component={Users} />}
        />
        <Route
          exact
          path={`${config.pathname}/auth`}
          render={(props) => <NotAuthLayout {...props} component={Auth} />}
        />
        <Redirect to={`${config.pathname}/auth`} />
      </Switch>
    </Router>
  );
};
