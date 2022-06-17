import React from "react";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart, loadFromUser } from "../store/cart";

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
    dispatch(addToCart(product, qty));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      {cart.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        cart.map((item) => (
          <CartItem
            key={item.id}
            product={item}
            handleQtyChange={handleQtyChange}
            removeFromCart={handleRemoveFromCart}
          />
        ))
      )}
    </div>
  );
};

export default Cart;
