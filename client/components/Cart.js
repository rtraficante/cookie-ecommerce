import React from "react";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, loadFromUser, editCart } from "../store/cart";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

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

  const mapInventory = (num) => {
    const nums = [];
    for (let i = 1; i <= num; i++) {
      nums.push(i);
    }
    return nums;
  };

  const total = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.qty;
    });
    return totalPrice;
  };

  return (
    <div className="mt-6">
      <div className="m-4">
        <h2 className="text-2xl">SHOPPING CART</h2>
      </div>
      <div className="border-t m-4 md:flex md:space-x-6">
        <div className="pt-4 md:w-2/3">
          {cart.map((item) => (
            <CartItem
              item={item}
              handleRemoveFromCart={handleRemoveFromCart}
              handleCartQty={handleCartQty}
              mapInventory={mapInventory}
            />
          ))}
        </div>
        <div className="md:w-1/3 flex-1">
          <div className="m-4">
            {cart.length ? (
              <div className="flex justify-between font-bold">
                <h2>Subtotal</h2>
                <h2>${total()}</h2>
              </div>
            ) : (
              <div className="border p-4">
                <h2 className="text-center">
                  There are no items in your cart.
                </h2>
              </div>
            )}
          </div>
          <div className="m-4 mt-8 flex flex-col justify-center space-y-6">
            {cart.length ? (
              <Link to={"/checkout"}>
                <button className="bg-blue-500 py-4 w-full text-white">
                  Checkout
                </button>
              </Link>
            ) : null}
            <Link
              to={"/products"}
              className="text-sm text-blue-600 text-center"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
