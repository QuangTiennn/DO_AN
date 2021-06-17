
import * as TypeChat from '../constants/ActionChat';

const initialState = {
  listMessages: []
};

const itemEditing = (state = initialState, action) => {
  switch (action.type) {
    case TypeChat.SAVE_MESS:
      console.log(action.payload.data)
      return {
        ...state,
        listMessages: [...state.listMessages, action.payload.data]
      }

    default:
      return state;
  }
};

export default itemEditing;
