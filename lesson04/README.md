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
