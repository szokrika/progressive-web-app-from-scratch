import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    //this.history = props.history;
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
        const { history } = this.props;
        if (response.data && response.data.length > 0)
          history.push('/profile');
        else
        history.push('/signup');
      });
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
          onClick={(event) => this.handleClick(event)}>Submit</button>
      </form>
      </div>
    );
  }
}


export default Login;