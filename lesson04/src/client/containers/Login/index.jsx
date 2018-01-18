import React from 'react';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import LoginView from '../../components/Login';
import { loginRequest } from './actions';

const mapDispatchToProps = dispatch => (
  {
    onLogin: (username, password) => {
      dispatch(loginRequest({username, password}));
    }
  }
);

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);