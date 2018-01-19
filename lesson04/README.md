# 04 - Lesson Four: Redux and Redux-Saga

We will continue on this project and refactor the old login logic into more elegent code using Redux

### Introducing Redux ###

```sh
npm install redux redux-saga react-redux react-router-redux@next redux-form
npm i --save-dev redux-logger
```

Let us start by adding react-redux, and react-router-redux.  
Create a folder called `client/redux`, and create two files: reducers.js, and store.js

```javascript
// reducers.js
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

export default combineReducers({
  router
});
```

```javascript
// store.js
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, push } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(history, initialState = {}) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware:  for intercepting and dispatching navigation actions
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  // optionally add redux-logger if you are in development mode
  if (process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger'); 
    middlewares.push(logger);
  }

  const store = createStore(
    reducers,
    applyMiddleware(...middlewares)
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;

  return store;
}

```
In the `app.jsx` file append a provider for react-router, and add react-router-redux as follows:

```javascript
// app.jsx
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import configureStore from './redux/store';

...
...
render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
```

Now, if you open your browser console, and by navigating between the two pages, you can see redux-logger, is logging every time you navigate between the pages.  
  

Let us now add redux-form

```javascript
// append this to reducers.js
import { reducer as form } from 'redux-form';

export default combineReducers({
  router,
  form
});
```
Login.jsx as for now, it is complicated, because it has UI, and the logic for authentication.  
We are going to split it up, and will do the same for every other component from now on.  
We will use a well-known pattern in React community called [Functional Stateless component](https://reactjs.org/docs/components-and-props.html), and we put the logic of login in [container component](https://medium.com/@learnreact/container-components-c0e67432e005).  

Let us create two folders, `components`, and `containers`, and create a folder called Login, in each.  
Then create `login.jsx` in src/client/components/Login.  

```javascript
// client/components/Login/login.jsx
import React from 'react';
import { Field, reduxForm } from 'redux-form';

let Login = (props) => {
  const { onLogin } = props;
    return (
    <div className="container">
      <form onSubmit={e => e.preventDefault(); onLogin();}>
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

export default reduxForm({ form: 'login', })(Login);
```

and in the containers/Login, create a file called `index.jsx`

```javascript
// client/containers/Login/index.js
import React from 'react';
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
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
```

```javascript
// client/containers/Login/actions.js
import { LOGIN_REQUEST } from '../../redux/types';

export function loginRequest() {
  return { type: LOGIN_REQUEST};
}
```

```javascript
// client/redux/constants.js
export const SENDING_REQUEST = 'SENDING_REQUEST';
export const CHANGE_FORM = 'CHANGE_FORM';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
```

