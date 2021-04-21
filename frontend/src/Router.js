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
          path={`${config.pathname}/roles`}
          component={(props) => <DefaultLayout {...props} component={Roles} />}
        />
        <PrivateRoute
          path={`${config.pathname}/categories`}
          component={(props) => (
            <DefaultLayout {...props} component={Categories} />
          )}
        />
        <PrivateRoute
          path={`${config.pathname}/products`}
          component={(props) => (
            <DefaultLayout {...props} component={Products} />
          )}
        />
        <PrivateRoute
          path={`${config.pathname}/users`}
          component={(props) => <DefaultLayout {...props} component={Users} />}
        />
        <PublicRoute
          path={`${config.pathname}/auth`}
          component={(props) => <NotAuthLayout {...props} component={Auth} />}
        />
        <PublicRoute
          path="*"
          component={(props) => (
            <NotAuthLayout {...props} component={NotFound} />
          )}
        />
      </Switch>
    </Router>
  );
};
