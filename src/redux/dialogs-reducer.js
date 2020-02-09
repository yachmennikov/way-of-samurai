const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
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
  ]
};

const dialogsReducer = (state = initialState, action) => {

  switch (action.type) {
    
    case SEND_MESSAGE: 
      let body = action.newMessageBody;
      return { 
        ...state,
        messages: [ ...state.messages, {id: 33, message: body} ]
      }
      
    default:
      return state
  }
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer