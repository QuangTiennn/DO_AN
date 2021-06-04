import * as TypesCart from '../constants/ActionCart';
import { Toastify } from '../utils/toastify'

const data = JSON.parse(localStorage.getItem('CART'));
const initialState = data || [];

const findTourInCart = (cart, tour) => {
  let index = -1;
  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].tour._id === tour._id) {
        index = i;
        break;
      }
    }
  }
  return index;
};
const Cart = (state = initialState, action) => {
  const { tour, quantity } = action;
  let index = -1; // k tim thay index = -1
  switch (action.type) {
    case TypesCart.ADD_TO_CART: {
      index = findTourInCart(state, tour);
      if (index !== -1) {
        state[index].quantity += quantity;
      } else {
        state.push({ tour, quantity });
      }
      localStorage.setItem('CART', JSON.stringify(state));
      return [...state];
    }
    case TypesCart.DELETE_TOUR_IN_CART: {
      index = findTourInCart(state, tour);
      if (index !== -1) {
        state.splice(index, 1);
      }
      localStorage.setItem('CART', JSON.stringify(state));
      return [...state];
    }
    case TypesCart.UPDATE_TOUR_IN_CART: {
      index = findTourInCart(state, tour);
      if (index !== -1) {
        state[index].quantity = quantity;
      }
      localStorage.setItem('CART', JSON.stringify(state));
      return [...state];
    }

    case TypesCart.BOOKING: {
      Toastify({ msg: 'Booking tour successfully', type: 'success' });

      return [...state];
    }
    default: return [...state];
  }
  // switch(action.type){
  //     case TypesCartCart.GET_CART:
  //         state = action.cart
  //         console.log(state, '[state]');
  //         return {...state}
  //     case TypesCartCart.ADD_TO_CART:
  //         return {...state};
  //     default : return {...state};
  // }
};

// export default persistReducer(persistConfig,Cart);
export default Cart;
