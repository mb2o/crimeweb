import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import Login from '../auth/Login';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';
import Register from '../auth/Register';
import CountyList from '../homicides/CountyList';
import TownshipList from '../homicides/TownshipList';
import CityList from '../homicides/CityList';
import PeopleList from '../people/PeopleList';

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/people/:city" component={PeopleList} />
        <PrivateRoute exact path="/homicides" component={CountyList} />
        <PrivateRoute
          exact
          path="/homicides/:county"
          component={TownshipList}
        />
        <PrivateRoute
          exact
          path="/homicides/:county/:township"
          component={CityList}
        />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
