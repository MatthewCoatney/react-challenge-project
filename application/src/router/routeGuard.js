import React from "react";
import { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";


export class ProtectedRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {authenticated: true};
    }
    
    render() {
      const { component: Component, ...props } = this.props
  
      return (
        <Route 
          {...props} 
          render={props => (
            this.state && this.state.authenticated ?
              <Component {...props} /> :
              <Redirect to='/login' />
          )} 
        />
      )
    }
  }


const mapStateToProps = (state) => {
    const { loggedIn } = state.auth;
    return {
      loggedIn
    };
  };
  
  export default connect(mapStateToProps)(ProtectedRoute);