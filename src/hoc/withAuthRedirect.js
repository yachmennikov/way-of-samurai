import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

let mapStateToPropsForRedirect = state => {
  return {
    isAuth: state.auth.isAuth
  }
}

export const withAuthRedirect = (SomeComponent) => {

  class RedirectComponent extends Component {
    render () {
      if (!this.props.isAuth) return <Redirect to="/login" />
      return <SomeComponent { ...this.props } />
    }
  }
  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent) 
  return ConnectedAuthRedirectComponent
}