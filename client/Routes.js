import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home";
import AllProducts from "./components/AllProducts";
import AddProduct from "./components/adminViews/AddProduct";
import UpdateProduct from "./components/adminViews/UpdateProduct";
import SingleProduct from "./components/SingleProduct";
import AdminOverview from "./components/adminViews/AdminOverview";
import AllUsersView from "./components/adminViews/AllUsersView";
import SingleUserView from "./components/adminViews/SingleUserView";
import Checkout from "./components/Checkout";
import { me } from "./store";
import Cart from "./components/Cart";
import { Login } from "./components/LoginForm";
import { Signup } from "./components/SignUpForm";
import UserPage from "./components/users/UserPage";

/**
 * COMPONENT
 */
class Routes extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/home" /> : <Login />}
        </Route>
        <Route exact path="/home">
          {isLoggedIn ? (
            <>
              <Home />
              <AllProducts />
            </>
          ) : (
            <>
              <AllProducts />
            </>
          )}
        </Route>
        <Route exact path="/login">
          {isLoggedIn ? (
            <Redirect to="/home" />
          ) : (
            <>
              <p>Log yo'self in!</p>
              <Login />
              <p>OR</p>
              <p>Join us to satisfy your sweet tooth!</p>
              <Signup />
            </>
          )}
        </Route>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />

        <Route exact path="/admin">
          {isAdmin ? <AdminOverview /> : <Redirect to="/home" />}
        </Route>
        <Route exact path="/admin/users">
          {isAdmin ? <AllUsersView /> : <Redirect to="/home" />}
        </Route>
        <Route path="/admin/users/:id">{isAdmin ? <SingleUserView /> : <Redirect to="/home" />}</Route>
        <Route exact path="/admin/products/add" component={AddProduct} />
        <Route path="/admin/products/:id/update" component={UpdateProduct} />
        <Route exact path="/user-info" component={UserPage} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
