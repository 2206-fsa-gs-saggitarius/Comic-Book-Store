import axios from 'axios';

const GET_CART = 'GET_CART';
const DELETE_CART_ITEM = 'DELETE_CART_ITEM';

const getCart = (cart) => ({
  type: GET_CART,
  cart,
});

const deleteCartItem = (cart) => ({
  type: DELETE_CART_ITEM,
  cart,
});

export const getCartThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.get(`/api/users/${id}`);
      dispatch(getCart(cart));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteCartItemThunk = (user, item) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data: updatedCart } = await axios.put(
        `/api/users/${user.id}`,
        {
          item: item,
          quantityChange: 0,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(deleteCartItem(updatedCart));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function cartReducer(state = {}, action) {
  switch (action.type) {
    // case UPDATE_CART: {
    //   return action.cart;
    // }
    case GET_CART: {
      return action.cart;
    }
    // case CHECKOUT_CART: {
    //   return action.previousOrder;
    // }
    case DELETE_CART_ITEM: {
      return action.cart;
    }
    default:
      return state;
  }
}
