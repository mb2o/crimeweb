import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AgeCounter from '../statistics/AgeCounter';
import HomicideCounter from '../statistics/HomicideCounter';
import NationalityCounter from '../statistics/NationalityCounter';
import PeopleList from '../people/PeopleList';

const Dashboard = ({ auth: { user } }) => {
  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welkom {user && user.name}
      </p>

      <div className="ui horizontal divider">Statistiek</div>

      <div className="ui three statistics">
        <HomicideCounter />
        <NationalityCounter />
        <AgeCounter />
      </div>

      <div className="ui divider" />

      <PeopleList />
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
