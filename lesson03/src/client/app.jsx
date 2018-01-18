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
import SignUp from './signUp';
import Profile from './profile';
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
        <Route path="/profile" component={Profile} />
        <Route path="/signup" component={SignUp} />
      </div>
      </Router>
    );
  }
}