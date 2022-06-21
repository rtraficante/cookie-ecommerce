import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutItem from "./CheckoutItem";
import { loadFromUser } from "../store/cart";
import StripeContainer from "./StripeContainer";
import { checkout } from "../store/checkout";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@material-ui/core";

const Checkout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const [values, setValues] = useState({
    name: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadFromUser());
    }
  }, [isLoggedIn]);

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <a href="/cart">Return To Cart</a>

      <Grid container direction="row" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3} className="checkout-products">
          {cart.length === 0 ? (
            <div>Nothing to checkout</div>
          ) : (
            cart.map((item) => <CheckoutItem key={item.id} product={item} />)
          )}
        </Grid>

        <form>
          <FormControl>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="address">Address</InputLabel>
            <Input
              id="address"
              name="address"
              value={values.address}
              onChange={handleChange}
              required
            />
          </FormControl>
        </form>
      </Grid>
      <StripeContainer />
    </>
  );
};

export default Checkout;
