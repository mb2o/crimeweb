import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import Login from '../auth/Login';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';
import Register from '../auth/Register';

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
