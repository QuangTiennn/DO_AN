import * as TypesLogin from '../constants/ActionTypeLogin';
import callApi, { requestApiForm } from '../utils/ApiCaller';
import { history } from '../store'

export const actLogin = (payload) => ({
  type: TypesLogin.USER_LOGIN,
  payload,
});

export const actLoginReq = (dataUserLogin) => (dispatch) => callApi('login', 'POST', dataUserLogin)
  .then((res) => {
    dispatch(actLogin(res.data));
  });

export const actRegister = (payload) => ({
  type: TypesLogin.USER_REGISTER,
  payload,
});

export const actRegisterReq = (dataUserRegister) => (dispatch) => requestApiForm('register', 'POST', dataUserRegister)
  .then((res) => {
    // eslint-disable-next-line no-console
    dispatch(actRegister(res.data));
    history.push('/login')
  });


export const getMeAction = (payload) => ({
  type: TypesLogin.GET_ME,
  payload,
});

export const getMeRequest = () => (dispatch) => callApi('user/get-me', 'GET')
  .then((res) => {
    dispatch(getMeAction(res.data.data));
  });
