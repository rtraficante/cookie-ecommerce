/* eslint-disable no-case-declarations */
import axios from "axios";

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

const _addToCart = (product, qty, user) => ({
  type: ADD_TO_CART,
  product: {
    id: product.id,
    name: product.name,
    imageURL: product.imageURL,
    price: product.price,
    inventory: product.inventory,
    qty,
    user,
  },
});

const _removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  id,
});

export const addToCart = (product, qty) => {
  return async (dispatch, getState) => {
    if (getState().auth.id > 0) {
      const { data } = await axios.post("/api/cart/", product, {
        headers: {
          user: getState().auth.id,
        },
      });

      dispatch(_addToCart(data.product, qty));
      localStorage.setItem("cart", JSON.stringify(data.cart));
    } else {
      const { data } = await axios.get(`/api/products/${product.id}`);

      dispatch(_addToCart(data, qty));
      localStorage.setItem("cart", JSON.stringify(getState().cart));
    }
  };
};

export const removeFromCart = (id) => {
  return async (dispatch, getState) => {
    if (getState().auth.id > 0) {
      const { data } = await axios.delete(`/api/cart/${id}`, {
        headers: {
          user: getState().auth.id,
        },
      });
      dispatch(_removeFromCart(id));
      localStorage.setItem("cart", JSON.stringify(data.cart));
    } else {
      dispatch(_removeFromCart(id));

      localStorage.setItem("cart", JSON.stringify(getState().cart));
    }
  };
};

const cartLocalStorage =
  localStorage.getItem("cart") !== "undefined"
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

const initialState = cartLocalStorage;

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.find((item) => item.id === action.product.id);

      if (existingItem) {
        return state.map((item) =>
          item.id === existingItem.id ? action.product : item
        );
      }

      return [...state, action.product];

    case REMOVE_FROM_CART:
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
};
