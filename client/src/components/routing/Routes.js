import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Alert from '../layout/Alert';
import CityList from '../homicides/CityList';
import CountyList from '../homicides/CountyList';
import Dashboard from '../dashboard/Dashboard';
import HomicideList from '../homicides/HomicideList';
import Login from '../auth/Login';
import NotFound from '../layout/NotFound';
import Person from '../people/Person';
import PrivateRoute from './PrivateRoute';
import Register from '../auth/Register';
import TownshipList from '../homicides/TownshipList';

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />

        <PrivateRoute
          exact
          path="/homicides/city/:city"
          component={HomicideList}
        />
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

        <PrivateRoute exact path="/people/:id" component={Person} />

        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
