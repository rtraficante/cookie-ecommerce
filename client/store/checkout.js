import axios from "axios";

const CHECKOUT = "CHECKOUT";

const _checkout = (cart) => ({
  type: CHECKOUT,
  cart,
});

export const checkout = (cart) => {
  return async (dispatch, getState) => {
    const user = getState().auth.id;

    const { data } = await axios.post("/api/checkout", cart, {
      headers: {
        user,
      },
    });
  };
};

const checkoutReducer = (state = initalState, action) => {
  switch (action.type) {
    case CHECKOUT:
      return [];
    default:
      return state;
  }
};
