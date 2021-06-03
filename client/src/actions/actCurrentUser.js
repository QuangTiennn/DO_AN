import * as TypesUser from '../constants/ActionTypeUser';
import callApi from '../utils/ApiCaller';

// eslint-disable-next-line import/prefer-default-export
export const actGetCurrentUser = (payload) => ({
  type: TypesUser.FETCH_CURRENT_USER,
  payload,
});

export const actionGetCurrentUser = (id) => (dispatch) => callApi(`user/get-userID/${id}`, 'GET')
  .then((res) => {
    dispatch(actGetCurrentUser(res.data));
  });
