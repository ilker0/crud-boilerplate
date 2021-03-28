import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import config from 'Config';

import { PrivateRoute } from 'Shared/Hoc';
import Auth from 'Auth/Routes';
import Roles from 'Roles/Routes';

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute
          exact
          path={`${config.pathname}/roles`}
          component={Roles}
        />
        <Route exact path={`${config.pathname}/auth`} render={Auth} />
        <Redirect to={`${config.pathname}/auth`} />
      </Switch>
    </Router>
  );
}

export default App;
