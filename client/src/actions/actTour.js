import * as Types from '../constants/ActionTypeTour';
import callApi from '../utils/ApiCaller';

export const actFetchTours = (tours) => ({
  type: Types.FETCH_TOURS,
  tours, // tours : tours
});

export const actFetchToursReq = () => (dispatch) => callApi('tour/get-all-tour', 'GET')
  .then((res) => {
    dispatch(actFetchTours(res.data));
  });

export const actAddTour = (tour) => ({
  type: Types.ADD_TOURS,
  tour,
  isSuccess: true
});

export const actAddTourReq = (tour) => (dispatch) => callApi('tour/add-tour', 'POST', tour)
  .then((res) => {
    dispatch(actAddTour(res.data));
  });

export const actDeleteTour = (id) => ({
  type: Types.DELETE_TOURS,
  id,
});

export const actDeleteTourReq = (id) => (dispatch) => {
  if (confirm("do you want delete tour")) { //eslint-disable-line
    return callApi(`tour/delete-tour/${id}`, 'DELETE', null)
      .then(() => {
        dispatch(actDeleteTour(id));
      });
  }
};

export const getTourByIdAction = (tour) => ({
  type: Types.GET_TOUR_BY_ID,
  tour,
});

export const getTourById = (_id) => (dispatch) => callApi(`tour/get-tourid/${_id}`, 'GET')
  .then((res) => {
      // eslint-disable-next-line no-console
    console.log(res.data, '<----');
    dispatch(getTourByIdAction(res.data));
  })
  .catch((err) => {
    throw err;
  });

export const updateTourAction = (tour) => ({
  type: Types.UPDATE_TOURS,
  tour,
  isSuccess: true
});

export const updateTour = (tour) => (dispatch) => callApi(`tour/update-tour/${tour._id}`, 'PUT', tour)
  .then((res) => {
    return dispatch(updateTourAction(res.data));
  });
