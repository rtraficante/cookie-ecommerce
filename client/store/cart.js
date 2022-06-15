import axios from "axios";

const ADD_TO_CART = "ADD_TO_CART";

const _addToCart = (product) => ({
  type: ADD_TO_CART,
  product,
});

export const addToCart = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/carts/", product);
      dispatch(_addToCart(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return action.product;

    default:
      return state;
  }
};
