import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../../redux/actions/authActions";
import { Link } from "react-router-dom";

const mapActionsToProps = (dispatch) => ({
  commenceLogin(email, password) {
    dispatch(loginUser(email, password));
  },
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  login(e) {
    e.preventDefault();
    this.props.commenceLogin(this.state.email, this.state.password);
    this.props.onLogin();
  }

  onChange(key, val) {
    this.setState({ [key]: val });
  }

  render() {
    return (
      <form>
        <Link to={"/order"} className="nav-link">
          <div className="nav-link-style">
            <label className="nav-label">Order Form</label>
          </div>
        </Link>
        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="test@test.com"
            value={this.state.email}
            onChange={(e) => this.onChange("email", e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            value={this.state.password}
            onChange={(e) => this.onChange("password", e.target.value)}
          ></input>
        </div>
        <div className="d-flex justify-content-center">
          <button
            onClick={(e) => this.login(e)}
            type="submit"
            className="btn btn-primary"
          >
            Login
          </button>
        </div>
      </form>
    );
  }
}

export default connect(null, mapActionsToProps)(LoginForm);
