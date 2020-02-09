import React, { Component, lazy } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
// styles
import './App.css';
// custom modules
import withSuspense from './hoc/withSuspense';
import HeaderContainer from './components/header/HeaderContainer';
import Navbar from './components/nav/Nav';
// import ProfileContainer from './components/profile/ProfileContainer';
import DialogsContainer from './components/dialogs/dialogs-container';
import UsersContainer from './components/users/UsersContainer';
import Login from './components/login/Login';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/preloader/Preloader';
// lazy loading components
const ProfileContainer = lazy( () => import('./components/profile/ProfileContainer'));



class App extends Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) return <Preloader />

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Route 
            exact 
            path="/dialogs" 
            render={ () => <DialogsContainer /> } />
          <Route 
            path="/profile/:userId?"
            render={ withSuspense(ProfileContainer) } />
          <Route 
            path="/users" 
            render={ () => <UsersContainer /> } />
          <Route 
            path="/login" 
            render={ () => <Login /> } />
        </div>
      </div>
    )
  } 
}

const mapStateToProps = (state) => ({ initialized: state.app.initialized })

export default compose(
  connect( mapStateToProps, { initializeApp }),
  withRouter
)(App)
