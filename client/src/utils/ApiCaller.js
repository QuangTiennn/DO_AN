import axios from 'axios';
import * as config from '../constants/Configs';

export default function callApi(endpoint, method = 'GET', body) {
  return axios({
    method,
    url: `${config.API_URL}/${endpoint}`,
    data: body,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .catch((err) => {
      throw err;
    });
}


export const requestApiForm = (endpoint, method = 'GET', body) => {
  return axios({
    method,
    url: `${config.API_URL}/${endpoint}`,
    data: body,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    },
  })
    .catch((err) => {
      throw err;
    });
}
