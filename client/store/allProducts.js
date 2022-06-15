import axios from 'axios';

const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

const _fetchProducts = (products) => ({
  type: FETCH_PRODUCTS,
  products,
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

const initalState = [];

export const productsReducder = (state = initalState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};
