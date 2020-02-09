import { getAuthUserData } from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let innitialState = {
  initialized: false
}

const appReducer = (state = innitialState, action) => {
  
  switch (action.type) {

    case INITIALIZED_SUCCESS:
      return { ...state, initialized: true }

    default:
      return state
  }
}

// action creators
export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

// thunks
export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise])
      .then( () => {
        dispatch(initializedSuccess())
      })
  
}

export default appReducer