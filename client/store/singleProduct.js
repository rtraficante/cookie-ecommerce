import axios from "axios";

const FETCH_PRODUCT = "FETCH_PRODUCT";

export const _fetchProduct = (product) => ({
  type: FETCH_PRODUCT,
  product,
});

export const fetchProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(_fetchProduct(data));
    } catch (err) {
      console.error(err);
    }
  };
};

const initalState = {};

export const productReducer = (state = initalState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      return action.product;
    default:
      return state;
  }
};
