import React, { Component } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserProfile, getStatus, updateStatus } from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends Component {

  componentDidMount () {
    let userId = this.props.match.params.userId || 5810;
    if (!userId) { 
      userId = this.props.authorizedUserId 
    }
    this.props.getUserProfile(userId)
    this.props.getStatus(userId)
  }

  render () {

    return (
      <div>
        <Profile 
          { ...this.props }
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
        />
      </div>
    )
  }  
}

let mapStateToProps = state => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.profilePage.userId,
    isAuth: state.profilePage.isAuth
  }
}

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
  withRouter,
  withAuthRedirect
)(ProfileContainer)