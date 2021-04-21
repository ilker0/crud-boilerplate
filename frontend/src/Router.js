import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import config from 'Config';

// Router
import { PrivateRoute, PublicRoute } from 'Shared/Hoc';

// Pages
import Auth from 'Auth/Routes';
import Roles from 'Roles/Routes';
import Categories from 'Categories/Routes';
import Products from 'Products/Routes';
import Users from 'Users/Routes';
import { NotFound } from 'Shared/Components';

// Layouts
import { DefaultLayout, NotAuthLayout } from 'Shared/Layouts';

export default () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute
          exact
          path={`${config.pathname}/`}
          component={(props) => <DefaultLayout {...props} component={Roles} />}
        />
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
        <PublicRoute
          exact
          path={`${config.pathname}/auth`}
          component={(props) => <NotAuthLayout {...props} component={Auth} />}
        />
        <PublicRoute
          exact
          path="*"
          component={(props) => (
            <NotAuthLayout {...props} component={NotFound} />
          )}
        />
      </Switch>
    </Router>
  );
};
