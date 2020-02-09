import { createStore, combineReducers, applyMiddleware } from 'redux';
import appReducer from './app-reducer';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import ThunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';


let reducers = combineReducers({
  app: appReducer,
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer
})
let store = createStore(reducers, applyMiddleware(ThunkMiddleware));
window.store = store

export default store