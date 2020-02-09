import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';

let store = {
  _state: {
    dialogs: [
      { id: 1, name: 'dicksucker1' },
      { id: 2, name: 'dicksucker2' },
      { id: 3, name: 'dicksucker3' },
      { id: 4, name: 'dicksucker4' },
      { id: 5, name: 'dicksucker5' },
      { id: 6, name: 'dicksucker6' }
    ], 
    messages: [
      { id: 1, message: 'sucker1' },
      { id: 2, message: 'sucker2' },
      { id: 3, message: 'sucker3' },
      { id: 4, message: 'sucker4' },
      { id: 5, message: 'sucker5' },
      { id: 6, message: 'sucker6' }
    ],
    posts: [
      { id: 1, message: 'post 1', likesCount: 0 },
      { id: 2, message: 'post 2', likesCount: 0 },
      { id: 3, message: 'post 3', likesCount: 1 },
      { id: 4, message: 'post 4',likesCount: 0 },
      { id: 5, message: 'post 5',likesCount: 2 },
      { id: 6, message: 'post 6', likesCount: 0 }
    ],
    newPostText: 'fuck'
  },
  getState () {
    return this._state
  },
  _callsubscriber() {
    console.log('dick')
  },
  subscribe (observer) {
    this._callsubscriber = observer
  },
  dispatch (action) {
    this._state = profileReducer(this._state, action);
    this._state = dialogsReducer(this._state, action)
    this._callsubscriber(this._state)
  }
}

export default store;
window.store = store