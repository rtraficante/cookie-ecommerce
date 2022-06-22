import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CheckoutItem from "./CheckoutItem";
import { Grid, Typography } from "@material-ui/core";

const Confirmation = () => {
  const order = useSelector((state) => state.cart);

  const totalPrice = order.reduce((accum, val) => {
    return (accum += val.price * val.qty);
  }, 0);

  return (
    <>
      <Grid container className="mb">
        <Grid item>
          <Typography variant="h5">
            Thank you for orders one of our world's famous cookies!
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Order Summary:</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} className="checkout-products">
          {order.map((item) => (
            <CheckoutItem key={item.id} product={item} />
          ))}
          Total: ${totalPrice}
        </Grid>
      </Grid>
    </>
  );
};

export default Confirmation;
