import React, { Component } from 'react';
import Users from './Users';
import { 
  follow, 
  unfollow,
  setCurrentPage, 
  getUsers
} from '../../redux/users-reducer';
import { connect } from 'react-redux';
import Preloader from '../common/preloader/Preloader';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getUsersList, 
         getCurrentPage, 
         getFollowingInProgress, 
         getIsFetching, 
         getPageSize, 
         getTotalUsersCount }
from '../../redux/selectors/users-selectors';

class UsersContainer extends Component {
  
  componentDidMount () {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize)
  }

  render () {
    
    return <>
            { this.props.isFetching ? <Preloader /> : null }
            <Users 
              users={this.props.users}
              currentPage={this.props.currentPage}
              onPageChanged={this.onPageChanged.bind(this)}
              unfollow={this.props.unfollow}
              follow={this.props.follow}
              setCurrentPage={this.props.setCurrentPage}
              followingInProgress={this.props.followingInProgress}
              totalUsersCount={this.props.totalUsersCount}
              pageSize={this.props.pageSize}
            />
          </>
  } 
}

let mapStateToProps = state => {
  return { 
    users: getUsersList(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(follow(userId))
    },
    unfollow: (userId) => {
      dispatch(unfollow(userId))
    },
    setCurrentPage: (pageNumber) => {
      dispatch(setCurrentPage(pageNumber))
    },
    getUsers: (page) => {
      dispatch(getUsers(page))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(UsersContainer)
