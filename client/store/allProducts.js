import axios from 'axios';

const FETCH_PRODUCTS = "FETCH_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";

const _fetchProducts = (products) => ({
  type: FETCH_PRODUCTS,
  products,
});

const _addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products');
      dispatch(_fetchProducts(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const addProduct = (product, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/products", product);
      dispatch(_addProduct(data));
      history.push("/products");
    } catch (err) {
      console.error(err);
    }
  };
};

const initalState = [];

export const productsReducer = (state = initalState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};
