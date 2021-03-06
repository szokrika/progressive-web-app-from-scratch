import React from 'react';
import { Field, reduxForm } from 'redux-form';

let Login = (props) => {
  const { onLogin } = props;
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxx', props);
    return (
    <div className="container">
      <form onSubmit={e => { e.preventDefault(); onLogin();} }>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <Field type="email" className="form-control" id="email" name="email" component="input" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Field type="password" className="form-control" id="password" name="password" placeholder="Password" component="input"/>
        </div>
        <button type="Submit" className="btn btn-primary">Login</button>
      </form>
    </div>);
};

export default reduxForm({ form: 'login' })(Login);