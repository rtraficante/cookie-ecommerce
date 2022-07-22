import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutItem from "./CheckoutItem";
import { loadFromUser } from "../store/cart";
import StripeContainer from "./StripeContainer";
import { checkout } from "../store/checkout";
import { useHistory } from "react-router-dom";


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
    <div className="flex justify-center">
      <div className="flex flex-col justify-center items-center w-3/4 max-w-[900px]">
        <div className="checkout-products border-2 p-4 w-full">
          <a href="/cart">Return To Cart</a>
          {cart.length === 0 ? (
            <div>Nothing to checkout</div>
          ) : (
            cart.map((item) => <CheckoutItem key={item.id} product={item} />)
          )}
          Total: ${totalPrice}
        </div>

        <div className="border-2 mt-4 w-full p-4 flex flex-col items-center">
          <h2 className="text-3xl">Shipping Details</h2>

          <div className="flex flex-col w-3/4">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="border-2 px-2 py-1 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col w-3/4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="border-2 px-2 py-1 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col w-3/4">
            <label htmlFor="street-address">Street Address</label>
            <input
              id="street-address"
              name="streetAddress"
              value={values.streetAddress}
              onChange={handleChange}
              className="border-2 px-2 py-1 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col w-3/4">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              value={values.city}
              onChange={handleChange}
              className="border-2 px-2 py-1 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col w-3/4">
            <label htmlFor="state">State</label>
            <input
              id="state"
              name="state"
              value={values.state}
              onChange={handleChange}
              className="border-2 px-2 py-1 rounded-md"
              required
            />
          </div>
          <div className="mt-4">
            <h2 className="text-3xl mb-2 text-center">Payment Details</h2>
            <StripeContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
