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
      <div className="flex flex-col justify-center items-center w-full lg:flex-row-reverse">
        <div className="checkout-products border-b lg:border lg:h-full lg:w-1/3 p-4 w-full flex flex-col items-center">
          <a href="/cart" className="self-start">
            Return To Cart
          </a>
          {cart.length === 0 ? (
            <div>Nothing to checkout</div>
          ) : (
            cart.map((item) => <CheckoutItem key={item.id} product={item} />)
          )}
          <div className="flex w-3/4 justify-between mt-6 border-t py-4">
            <p>Total</p>
            <p className="font-bold">${totalPrice}</p>
          </div>
        </div>

        <div className="border-b mt-4 w-full p-4 flex flex-col items-center lg:w-2/3 max-w-[900px]">
          <div className="w-3/4">
            <h2 className="text-xl">Contact Information</h2>
          </div>

          <div className="flex flex-col w-3/4 mt-4">
            <input
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Email"
              className="border-2 px-3 py-2 rounded-md"
              required
            />
          </div>

          <div className="w-3/4 mt-6 mb-2">
            <h2 className="text-xl">Shipping Details</h2>
          </div>

          <div className="flex flex-col w-3/4 mt-4">
            <input
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border-2 px-3 py-2  rounded-md"
              required
            />
          </div>

          <div className="flex flex-col w-3/4 mt-4">
            <input
              id="street-address"
              name="streetAddress"
              value={values.streetAddress}
              onChange={handleChange}
              placeholder="Address"
              className="border-2 px-3 py-2  rounded-md"
              required
            />
          </div>
          <div className="flex flex-col w-3/4 mt-4">
            <input
              id="city"
              name="city"
              value={values.city}
              onChange={handleChange}
              placeholder="City"
              className="border-2 px-3 py-2  rounded-md"
              required
            />
          </div>
          <div className="flex flex-col w-3/4 mt-4">
            <input
              id="state"
              name="state"
              value={values.state}
              onChange={handleChange}
              placeholder="State"
              className="border-2 px-3 py-2  rounded-md"
              required
            />
          </div>
          <div className="mt-6 w-3/4">
            <div className="w-3/4">
              <h2 className="text-xl">Payment Details</h2>
            </div>
            <StripeContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
