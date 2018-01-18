# 02 - Lesson Two: React, React-Router

In this part we will introduce React and its ecosystem.  


### Introducing React ###

```sh
npm i react react-dom babel-polyfill 
npm i --save-dev babel-preset-react
```

add a subfolder src/client
add two files: index.jsx and app.jsx
add the following code:

```js
// app.jsx
import React from 'react';
const App = () => (<h1>Hello React!</h1>);
export default App;
```

```js
// index.jsx
import React from 'react';
import { render } from 'react-dom';
import App from './app';

render(<App />, document.querySelector('#app'));
```


Add the following to `.babelrc`: "react"
```json
// .babelrc
{
  "presets": [
    "env", "react"
  ]
}
```

Let us be more fancy:

```sh
npm i --save-dev rimraf html-webpack-plugin
```

Add `index.html` into `src/` directory, and add the following:

```html
<!doctype html>
<html>
  <head>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```
Change webpack.config.babel as this:

change webpack.config.babel.js for the entry point:

```js
// webpack.config.babel.js
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: [
    './src/client',
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```

Add the following in `package.json`:
```js
// package.json
"scripts": {
  "prebuild": "rimraf dist"
}
```

Delete the old `index.html` and delete all old js files.  

<br />

### Introduce react-router ###
Let us add react-router:  
```sh
npm i react-router-dom
```

Change app.jsx:

```js
// app.jsx
"scripts": {
  "prebuild": "rimraf dist"
}
```

Add two more files:  

* home.jsx
* login.jsx

```js
// home.jsx
import React from 'react';
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);
export default Home;
```

```js
// login.jsx
import React from 'react';
const Login = () => (
  <div>
    <h2>Login</h2>
  </div>
);
export default Login;
```

Modify app.jsx

```js
// app.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './home';
import Login from './login';


const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
);
export default App;
```
