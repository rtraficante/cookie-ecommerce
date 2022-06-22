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
    streetAddress: "",
    city: "",
    state: "",
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

  const totalPrice = cart.reduce((accum, val) => {
    return (accum += val.price * val.qty);
  }, 0);

  return (
    <>
      <Grid container className="mb">
        <Grid item>
          <a href="/cart">Return To Cart</a>
        </Grid>
      </Grid>

      <Grid container direction="row" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3} className="checkout-products">
          {cart.length === 0 ? (
            <div>Nothing to checkout</div>
          ) : (
            cart.map((item) => <CheckoutItem key={item.id} product={item} />)
          )}
          Total: ${totalPrice}
        </Grid>

        <Grid
          item
          container
          xs={12}
          sm={6}
          md={4}
          direction="column"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h5">Shipping Details</Typography>
          </Grid>
          <Grid item className="checkout-row">
            <FormControl className="checkout-field">
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Grid>

          <Grid item className="checkout-row">
            <FormControl className="checkout-field">
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Grid>

          <Grid item className="checkout-row">
            <FormControl className="checkout-field">
              <InputLabel htmlFor="street-address">Street Address</InputLabel>
              <Input
                id="street-address"
                name="streetAddress"
                value={values.streetAddress}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item className="checkout-row">
            <FormControl className="checkout-field">
              <InputLabel htmlFor="city">City</InputLabel>
              <Input
                id="city"
                name="city"
                value={values.city}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item className="checkout-row">
            <FormControl className="checkout-field">
              <InputLabel htmlFor="state">State</InputLabel>
              <Input
                id="state"
                name="state"
                value={values.state}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item style={{ marginTop: 20 }}>
            <Typography variant="h5">Payment Details</Typography>
          </Grid>
          <Grid item className="checkout-row">
            <StripeContainer />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Checkout;
