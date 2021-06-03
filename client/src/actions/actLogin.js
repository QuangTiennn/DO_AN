import * as TypesLogin from '../constants/ActionTypeLogin';
import callApi from '../utils/ApiCaller';

export const actLogin = (dataUserLogin) => ({
  type: TypesLogin.USER_LOGIN,
  dataUserLogin,
});

export const actLoginReq = (dataUserLogin) => (dispatch) => callApi('login', 'POST', dataUserLogin)
  .then((res) => {
    console.log({res})
    dispatch(actLogin(res.data));
  });

export const actRegister = (dataUserRegister) => ({
  type: TypesLogin.USER_REGISTER,
  dataUserRegister,
});

export const actRegisterReq = (dataUserRegister) => (dispatch) => callApi('register', 'POST', dataUserRegister)
  .then((res) => {
    dispatch(actRegister(res.data));
  });
