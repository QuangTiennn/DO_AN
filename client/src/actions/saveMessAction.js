import * as TypesChat from '../constants/ActionChat';

export const saveMessAction = (payload) => ({
  type: TypesChat.SAVE_MESS,
  payload,
});
