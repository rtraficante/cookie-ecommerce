import axios from "axios";

const FETCH_PRODUCTS = "FETCH_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";
const EDIT_PRODUCT = "EDIT_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";

const _fetchProducts = (products) => ({
  type: FETCH_PRODUCTS,
  products,
});

const _addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

const _editProduct = (product) => ({
  type: EDIT_PRODUCT,
  product,
});

const _deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  product,
});

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      dispatch(_fetchProducts(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const addProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/products", product);
      dispatch(_addProduct(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const editProduct = (product) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(
      `/api/products/${product.id}`,
      product
    );
    dispatch(_editProduct(updated));
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    const { data: product } = await axios.delete(`/api/products/${id}`);
    dispatch(_deleteProduct(product));
  };
};

const initalState = [];

export const productsReducer = (state = initalState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.product];
    case EDIT_PRODUCT:
      return state.map((product) => {
        return product.id === action.product.id ? action.product : product;
      });
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
};
