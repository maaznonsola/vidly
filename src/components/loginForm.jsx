import React, {Component} from "react";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: "",
    },
  };
  handleSubmit = (event) => {
    event.preventDefault();

    // Call the server
    console.log("Submitted");
  };
  handleChange = ({currentTarget: input}) => {
    const account = {...this.state.account};
    account[input.name] = input.value;
    this.setState({account});
  };

  render() {
    const {username, password} = this.state.account;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              autoFocus
              name="username"
              value={username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              className="form-control"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
