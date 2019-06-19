import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Alert from '../layout/Alert';
import CityList from '../homicides/CityList';
import CountyList from '../homicides/CountyList';
import Dashboard from '../dashboard/Dashboard';
import HomicideList from '../homicides/HomicideList';
import Login from '../auth/Login';
import NotFound from '../layout/NotFound';
import Person from '../people/PersonDetails';
import PrivateRoute from './PrivateRoute';
import Register from '../auth/Register';
import TownshipList from '../homicides/TownshipList';
import NationalityList from '../homicides/NationalityList';

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
          path="/homicides/current/month"
          component={HomicideList}
        />

        <PrivateRoute
          exact
          path="/homicides/current/year"
          component={HomicideList}
        />

        <PrivateRoute
          exact
          path="/homicides/nationalities"
          component={NationalityList}
        />

        <PrivateRoute
          exact
          path="/homicides/nationalities/country/:countryId"
          component={HomicideList}
        />

        <PrivateRoute
          exact
          path="/homicides/geographical"
          component={CountyList}
        />

        <PrivateRoute
          exact
          path="/homicides/geographical/city/:city"
          component={HomicideList}
        />

        <PrivateRoute
          exact
          path="/homicides/geographical/:county"
          component={TownshipList}
        />

        <PrivateRoute
          exact
          path="/homicides/geographical/:county/:township"
          component={CityList}
        />

        <PrivateRoute exact path="/people/:id" component={Person} />

        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
