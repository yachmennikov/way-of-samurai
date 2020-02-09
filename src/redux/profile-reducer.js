import { profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
  posts: [
    { id: 1, message: 'post 1', likesCount: 0 },
    { id: 2, message: 'post 2', likesCount: 0 },
    { id: 3, message: 'post 3', likesCount: 1 },
    { id: 4, message: 'post 4',likesCount: 0 },
    { id: 5, message: 'post 5',likesCount: 2 },
    { id: 6, message: 'post 6', likesCount: 0 }
  ],
  profile: null,
  status: ''
}

const profileReducer = (state = initialState, action) => {

  switch (action.type) {

    case ADD_POST: 
      let newPost = {
        id: Math.ceil(Math.random() * 100),
        message: action.newPostBody,
        likesCount: 9
      }
      return { ...state, posts: [...state.posts, newPost] }
      
    case SET_USER_PROFILE:
      return { ...state, profile: action.profile }

    case SET_STATUS:
      return { ...state, status: action.status }
  
    default:
      return state
  }
}

// action creators
export const addPostActionCreator = (newPostBody) => ({ type: ADD_POST, newPostBody });

const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
const setStatus = (status) => ({ type: SET_STATUS, status });

// thunks
export const getUserProfile = (userId) => (dispatch) => {
  profileAPI.getProfile(userId)
  .then( response =>  {
    dispatch(setUserProfile(response.data))
  })
  .catch( err => console.log(err))
} 

export const getStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId)
    .then( response => {
      dispatch(setStatus(response.data))
    })
    .catch( err => console.log(err))
}

export const updateStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status)
    .then( response => {
      if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
      }
    })
    .catch( err => console.log(err))
}

export default profileReducer