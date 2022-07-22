import React from "react";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, loadFromUser, editCart } from "../store/cart";
import { Button } from "@material-ui/core";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => !!state.auth.id);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadFromUser());
    }
  }, [isLoggedIn]);

  const handleCartQty = (product, qty) => {
    dispatch(editCart(product, qty));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const total = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.qty;
    });
    return totalPrice;
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-between w-full max-w-[1200px]">
        {cart.length === 0 ? null : (
          <div className="flex flex-col items-center border-2 p-4 md:w-2/6 rounded-md w-[280px] max-w-[600px] h-[300px]">
            <div className="w-full pt-8">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between mb-4 mt-1">
                  <h5>
                    {item.name} x {item.qty}
                  </h5>
                  <p>${item.price * item.qty}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between w-full">
              <h2>Total: </h2>
              <h2>${total()}</h2>
            </div>
            <div className="mt-16">
              <Button href="/checkout" variant="contained" color="primary">
                Proceed To Checkout
              </Button>
            </div>
          </div>
        )}
        <div>
          {cart.length === 0 ? (
            <h2 className="text-2xl text-center">Your cart is empty</h2>
          ) : (
            <div className="flex flex-col md:flex-row">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  product={item}
                  removeFromCart={handleRemoveFromCart}
                  handleCartQty={handleCartQty}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
