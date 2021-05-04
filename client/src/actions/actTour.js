import * as Types from '../constants/ActionTypeTour';
import callApi from '../utils/ApiCaller';

export const actFetchTours = (tours) => ({
  type: Types.FETCH_TOURS,
  tours, // tours : tours
});
export const actFetchToursReq = () => (dispatch) => callApi('tour/get-all-tour', 'GET', null)
  .then((res) => {
    dispatch(actFetchTours(res.data));
  });

export const actAddTour = (tour) => ({
  type: Types.ADD_TOURS,
  tour,
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

export const actGetTourByID = (tour) => ({
  type: Types.GET_TOUR_BY_ID,
  tour,
});

export const actGetTourByIDReq = (tourID) => (dispatch) => callApi(`tour/get-tourid/${tourID}`, 'GET', null)
  .then((res) => {
    dispatch(actGetTourByID(res.data));
  })
  .catch((err) => {
    throw err;
  });

export const actEditTour = (tour) => ({
  type: Types.UPDATE_TOURS,
  tour,
});

export const actEditTourReq = (tour) => (dispatch) => callApi(`tour/update-tour/${tour._id}`, 'PUT', tour)
  .then((res) => {
    dispatch(actEditTour(res.data));
  });
