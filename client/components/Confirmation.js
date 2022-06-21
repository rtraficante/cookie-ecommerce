import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CheckoutItem from "./CheckoutItem";

const Confirmation = () => {
  const order = useSelector((state) => state.cart);

  return (
    <div>
      <h4>Thank you for orders one of our world's famous cookies!</h4>
      <p>Order Summary:</p>
      {order.map((product) => (
        <CheckoutItem key={product.id} product={product} />
      ))}
      <h5>
        Total: $
        {order.reduce((accum, val) => {
          return accum + val.price;
        }, 0)}
      </h5>
    </div>
  );
};

export default Confirmation;
