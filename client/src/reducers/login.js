import * as TypesLogin from '../constants/ActionTypeLogin';

const initialState = {
  isLogin: false,
  dataUserLogin: null,
  token: !!localStorage.getItem('token')

};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case TypesLogin.USER_LOGIN:
      if (action.dataUserLogin.code === 200) {
        localStorage.setItem('token', action.payload.accessToken);
        state.isLogin = true;
        state.dataUserLogin = action.dataUserLogin;
      }
      return { ...state };
    case TypesLogin.USER_REGISTER:
      return { ...state };
    default: return { ...state };
  }
};

export default LoginReducer
