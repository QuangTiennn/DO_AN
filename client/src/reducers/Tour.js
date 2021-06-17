

import { Toastify } from '../utils/toastify'

import * as Types from '../constants/ActionTypeTour';

const initialState = {
  listTour: [],
  isRefresh: false
}

const findIndex = (tours, id) => {
  let result = -1;
  tours.forEach((tour, index) => {
    if (tour._id === id) {
      result = index;
    }
  });
  return result;
};

const tours = (state = initialState, action) => {
  let index = -1;
  const tourID = action.id;
  const { tour, isSuccess } = action;

  switch (action.type) {
    case Types.FETCH_TOURS:
      return { ...state, listTour: action.tours }
    case Types.ADD_TOURS:
      if (isSuccess) {
        Toastify({ msg: 'Create tour successfully', type: 'success' });
        state.listTour.push(action.tour);
      }
      return state
    case Types.DELETE_TOURS:
      index = findIndex(state.listTour, tourID);
      state.listTour.splice(index, 1);
      return state
    case Types.UPDATE_TOURS:

      index = findIndex(state.listTour, action.tour._id);
      state.listTour[index] = tour;
      Toastify({ msg: 'Update tour successfully', type: 'success' });
      return { ...state, isRefresh: true }
    case Types.SEARCH_TOUR:

      return { ...state, listTour: action.payload }

    default: return state
  }
};

export default tours;
