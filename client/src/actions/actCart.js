import * as TypesCart from '../constants/ActionCart';
import callApi from '../utils/ApiCaller';

export const actAddToCart = (tour, quantity) => ({
  type: TypesCart.ADD_TO_CART,
  tour, // tour : tour
  quantity, // quantity : quantity
});




export const actAddToCartAPI = () => {

};


export const actionBooking = (payload) => ({
  type: TypesCart.BOOKING,
  payload
});


export const actAddToCartAPIReq = (cart) => (dispatch) => callApi('add-to-cart', 'POST', cart)
  .then((res) => {
    dispatch(actionBooking(res.data));
  });

export const actDeleteTourInCart = (tour) => ({
  type: TypesCart.DELETE_TOUR_IN_CART,
  tour, // tour : tour
});

export const actUpdateTourInCart = (tour, quantity) => ({
  type: TypesCart.UPDATE_TOUR_IN_CART,
  tour,
  quantity,
});
