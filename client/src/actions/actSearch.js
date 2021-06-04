import * as TypesSearch from '../constants/ActionTypeTour';
import callApi from '../utils/ApiCaller';

// eslint-disable-next-line import/prefer-default-export
export const actSearchTour = (payload) => ({
  type: TypesSearch.SEARCH_TOUR,
  payload,
});

export const actionSearchOnTour = (q) => (dispatch) => callApi(`tour/get-all-tour?q=${q}`, 'GET')
  .then((res) => {
    dispatch(actSearchTour(res.data));
  });
