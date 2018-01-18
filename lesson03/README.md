# 03 - Lesson Three: Bootstrap, basic login page

We will continue on this project and add a basic login page

### Introducing Bootstrap ###

```sh
npm install bootstrap@4.0.0-beta.3 reactstrap@next
```

Let us write the links that exist on the main page for home and login, using Bootstrap's navbar.  
Edit the `app.jsx` page like this

```javascript
// app.jsx
import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import Home from './home';
import Login from './login';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
   

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Router>
        <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">MY-APP</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/login/">Login</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </div>
      </Router>
    );
  }
}
```

Add a directory called `src/css` and add a file called `main.global.css`, and add the following code:

<pre><code class="language-css"> // main.global.css
@import '~bootstrap/dist/css/bootstrap.css';
```

in the file index.jsx, append this line after last line with import `App` module.


```javascript
// index.jsx
import App from './app';
import './css/main.global.css';
```

Add a new rule to webpack config file to tranfer css file, like this:
```javascript
// webpack.config.babel.js
 rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.global\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: {
            sourceMap: true
          } }
        ]
      }
    ],
```

import the above loaders required by webpack

```sh
npm i --save-dev style-loader css-loader
```

If you run the build now, and run the application, you will see the main page with a nice navigation bar from Bootstrap with a link to login page.
```sh
npm run build
npm start
```
Let us modify the `login.jsx` page to be more a simple login page, with two input text: username , and password, with a button called `login`, and when we press the button we do something with the username and password.

```javascript
// login.jsx
import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: ''};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log(this.state);
    // do something with username and password
  }

  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" 
              onChange={(event) => this.setState({username: event.target.value})}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" 
              onChange={(event) => this.setState({password: event.target.value})}/>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="checkout" />
            <label className="form-check-label" htmlFor="checkout">Check me out</label>
          </div>
          <button type="button" className="btn btn-primary"
            onClick={(event) => this.handleClick(event)}>Login</button>
        </form>
      </div>
    );
  }
}
export default Login;
```
The above form will now display the username and password entered into the input text boxes.  

<br />
<br />

Navigate to the login page, and you will see a beautiful login page.  
Try to enter username, and password, and press the login button, and see the result in the console.  

### Introducing json-server and axios ###
Let us imagine that we have a web service, that contains user data, which we can query using username, and password, and return any user that satisfy the searched criteria.  

I am not going to build this web service, because our course is front end only, so I will use a simulator tool, that can simulate a real webservice with a database.  
The simulator tool called: [`json-server`](https://github.com/typicode/json-server), and it is an npm package, where you can feed it with any json file, and the tool will provide REST API, to search, and even update the json file.  
Download the json-server using:

```sh
npm i --save-dev json-server
```

and create the following folder: `extras`, and create inside it a json file called `db.json`, and add the following code:
<pre><code class="language-json">// db.json
{
  "users": [
    {"id": 1, "username": "abc@s.com", "password": "abc", "name": "John Smith"}
  ]
}
```

Now, we want to run the json-server, whenever we want to run our development, at the same time we want to run our web app.  
In order to run two applications at the same time, we can use another tool called [`concurrently`](https://www.npmjs.com/package/concurrently).  
Download it :
```sh
npm i --save-dev concurrently
```
And modify the `"start"` script in `package.json` file as follows:
<pre><code class="language-json">// package.json
"scripts": {
    "build": "webpack",
    "start": "concurrently \"webpack-dev-server --open\" \"json-server --watch extras/db.json --port 3004\"",
    "prebuild": "rimraf dist"
  },
```
This will strt both json-server on port 3004 and our webpack-dev-server on port 8080.  
Let us go back to our login.jsx and make our login query the fake server.  
But before that, we need a tool to query REST service, and this is why we need [`axios`](https://www.npmjs.com/package/axios)
```sh
npm i axios
```

```javascript
// login.jsx
import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log(this.state);
    axios.get('http://localhost:3004/users', {params: this.state})
      .then((response) => {
        // do something with the data
        console.log(response.data);
      });
  }
```