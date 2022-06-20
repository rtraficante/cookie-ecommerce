import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import { productsReducer } from "./allProducts";
import { productReducer } from "./singleProduct";
import usersReducer from "./admin/users";
import userReducer from "./admin/singleUser";
import { cartReducer } from "./cart";
import { checkoutReducer } from "./checkout";

const reducer = combineReducers({
  auth,
  allProducts: productsReducer,
  singleProduct: productReducer,
  allUsers: usersReducer,
  singleUser: userReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
