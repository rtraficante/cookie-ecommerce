import axios from "axios";

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

const _addToCart = (product) => ({
  type: ADD_TO_CART,
  product,
});

export const addToCartUser = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/carts/", product);
      dispatch(_addToCart(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const addToCartGuest = (product, qty) => {
  return async (dispatch) => {
    const { data } = await axios.get(`api/products/${product.id}`);
  };
};

const initialState = [];

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.product];

    case REMOVE_FROM_CART:
      return state.filter((item) => item.id !== action.product.id);
    default:
      return state;
  }
};
