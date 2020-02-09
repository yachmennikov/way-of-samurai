import usersAPI from '../api/api';
import { updateObjectInArray } from '../components/utils/objects-helpers'

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: []
}


const usersReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case FOLLOW:
      // new way
        return { ...state, users: updateObjectInArray(state.users, action.userId, 'id', { followed: true }) }

      // old way

      // return {...state, users: state.users.map( user => {
      //   if (user.id === action.userId) {
      //     return { ...user, followed: true }
      //   }
      //   return user}
      // )}

    case UNFOLLOW:
      return { ...state, users: updateObjectInArray(state.users, action.userId, 'id', { followed: false }) }
      // return {...state, users: state.users.map( user => {
      //   if (user.id === action.userId) {
      //     return { ...user, followed: false }
      //   }
      //   return user}
      // )}

    case SET_USERS: 
      return { ...state, users: action.users }
      
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage }

    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.totalUsersCount }

    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching }

    case TOGGLE_IS_FOLLOWING_PROGRESS:
        return { ...state, followingInProgress: action.isFetching
          ? [ ...state.followingInProgress, action.userId]
          : state.followingInProgress.filter( id => id !== action.userId )
        }

    default:
      return state
  }
}

// action creators
export const followAC = (userId) => ({ type: FOLLOW, userId });
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingInProgress = (follInProg, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, follInProg, userId });

// thunks
export const getUsers = (page, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

export const follow = (userId) => async (dispatch) => {
    dispatch(toggleFollowingInProgress(true, userId))
    let response = await usersAPI.follow(userId)
      if (response.data.resultCode === 0) {
        dispatch(followAC(userId))
      }
      dispatch(toggleFollowingInProgress(false, userId))
}

export const unfollow = (userId) => async (dispatch) => {
    dispatch(toggleFollowingInProgress(true, userId))
  let response = await usersAPI.unfollow(userId)
    if (response.data.resultCode === 0) {
      dispatch(unfollowAC(userId))
    }
    dispatch(toggleFollowingInProgress(false, userId))
}

export default usersReducer