import { authAPI, securityAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let innitialState = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
  captchaUrl: null
}

const authReducer = (state = innitialState, action) => {
  
  switch (action.type) {

    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return { ...state,  ...action.payload }

    default:
      return state
  }
}

// action creators
const setAuthUserData = (id, login, email, isAuth) => ({type: SET_USER_DATA, payload: {id, login, email, isAuth}});
const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } });

// thunks
export const getAuthUserData = () => async (dispatch) => {
  let response = await authAPI.me()
     if (response.data.resultCode === 0) {
       let {id, login, email} = response.data.data
       dispatch(setAuthUserData(id, login, email, true))
     }
}

export const login = (email, password, rememberMe) => async (dispatch) => {
  let response = await authAPI.login(email, password, rememberMe)
     if (response.data.resultCode === 0) {
       dispatch(getAuthUserData())
     } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrl())
      } 
     }
        let message = response.data.messages.length > 0 
        ? response.data.messages[0] 
        : 'E-Mail or password is wrong. Please try again';
        dispatch(stopSubmit('login', {_error: message}))
     
}

export const logout = () => async (dispatch) => {
  let response = await authAPI.logout()
     if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
     }
}

export const getCaptchaUrl = () => async (dispatch) => {
  let response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer





