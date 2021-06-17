import * as TypesLogin from '../constants/ActionTypeLogin';

import { history } from '../store'

const initialState = {
  isLogin: false,
  dataUserLogin: null,
  token: !!localStorage.getItem('token'),
  code: null,
  profile: {}
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case TypesLogin.USER_LOGIN:

      if (action.payload.code === 200) {
        localStorage.setItem('token', action.payload.accessToken);
        state.isLogin = true;
        state.dataUserLogin = action.dataUserLogin;
      }
      return { ...state, code: action.payload.code };
    case TypesLogin.USER_REGISTER:
      return { ...state };

    case TypesLogin.GET_ME:
      return { ...state, profile: action.payload };
    default: return { ...state };
  }
};

export default LoginReducer
