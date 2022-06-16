import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home";
import AllProducts from "./components/AllProducts";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import SingleProduct from "./components/SingleProduct";
import { me } from "./store";
import { Login } from "./components/LoginForm";
import { Signup } from "./components/SignUpForm";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <div>
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <Redirect to="/home" /> : <Login />}
          </Route>
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/products/:id" component={SingleProduct} />
          <Route exact path="/admin/products/add" component={AddProduct} />
          <Route path="/products/:id/update" component={UpdateProduct} />
        </Switch>

        {/* {isLoggedIn ? (
            <Route exact path="/home" component={Home} />
            <Redirect to="/home" />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/add" component={AddProduct} />
            <Route path="/products/:id/update" component={UpdateProduct} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/products/add" component={AddProduct} />
            <Route path="/products/:id/update" component={UpdateProduct} />

        )} */}
      </div>
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
