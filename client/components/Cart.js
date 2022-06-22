import React from "react";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart, loadFromUser, editCart } from "../store/cart";
import { Button, Grid, Container } from "@material-ui/core";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => !!state.auth.id);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadFromUser());
    }
  }, [isLoggedIn]);

  const handleQtyChange = (product, qty) => {
    dispatch(editCart(product, qty));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <div>
        {cart.length === 0 ? (
          <div>Your cart is empty</div>
        ) : (
          <Container maxWidth="lg" sx={{ marginY: 12 }}>
            <Grid container spacing={5} style={{ justifyContent: "space-around" }}>
              {cart.map((item, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <CartItem key={item.id} product={item} removeFromCart={handleRemoveFromCart} handleQtyChange={handleQtyChange} />
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </div>
      <div style={{ paddingTop: 15 }}>
        <Button href="/checkout" variant="contained" color="primary">
          Proceed To Checkout
        </Button>
      </div>
    </>
  );
};

export default Cart;
