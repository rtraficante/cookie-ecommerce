import React from "react";
import CartItem from "./CartItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCartGuest } from "../store/cart";

const Cart = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const handleQtyChange = (product, qty) => {
    dispatch(addToCart(product, qty));
  };

  const removeFromCart = (id) => {
    dispatch(removeFromCartGuest(id));
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
            removeFromCart={removeFromCart}
          />
        ))
      )}
    </div>
  );
};

export default Cart;
