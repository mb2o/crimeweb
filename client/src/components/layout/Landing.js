import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">CrimeWeb</h1>
          <p className="lead">
            Historisch overzicht van alle levensmisdrijven gepleegd op
            Nederlanders in binnen- en buitenland
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Registreer
            </Link>
            <Link to="/login" className="btn btn-light">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
