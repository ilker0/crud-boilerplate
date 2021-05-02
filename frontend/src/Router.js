import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import config from 'Config';

// Router
import { PrivateRoute, PublicRoute } from 'Shared/Hoc';

// Pages
import HomePage from 'HomePage/Routes';
import Settings from 'Settings/Routes';
import Auth from 'Auth/Routes';
import Roles from 'Roles/Routes';
import Categories from 'Categories/Routes';
import Products from 'Products/Routes';
import Gallery from 'Gallery/Routes';
import Users from 'Users/Routes';
import Profile from 'Profile/Routes';
import UserActions from 'UserActions/Routes';
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
          component={(props) => (
            <DefaultLayout
              routeKey="homepage"
              {...props}
              component={HomePage}
            />
          )}
        />
        <PrivateRoute
          exact
          path={`${config.pathname}/settings`}
          component={(props) => (
            <DefaultLayout
              routeKey="settings"
              {...props}
              component={Settings}
            />
          )}
        />
        <PrivateRoute
          path={`${config.pathname}/roles`}
          component={(props) => (
            <DefaultLayout routeKey="roles" {...props} component={Roles} />
          )}
        />
        <PrivateRoute
          path={`${config.pathname}/categories`}
          component={(props) => (
            <DefaultLayout
              routeKey="categories"
              {...props}
              component={Categories}
            />
          )}
        />
        <PrivateRoute
          path={`${config.pathname}/products`}
          component={(props) => (
            <DefaultLayout
              routeKey="products"
              {...props}
              component={Products}
            />
          )}
        />
        <PrivateRoute
          path={`${config.pathname}/gallery`}
          component={(props) => (
            <DefaultLayout routeKey="gallery" {...props} component={Gallery} />
          )}
        />
        <PrivateRoute
          path={`${config.pathname}/users`}
          component={(props) => (
            <DefaultLayout routeKey="users" {...props} component={Users} />
          )}
        />
        <PrivateRoute
          path={`${config.pathname}/my-profile`}
          component={(props) => (
            <DefaultLayout
              routeKey="my-profile"
              {...props}
              component={Profile}
            />
          )}
        />
        <PrivateRoute
          path={`${config.pathname}/user-actions`}
          component={(props) => (
            <DefaultLayout
              routeKey="user-actions"
              {...props}
              component={UserActions}
            />
          )}
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
