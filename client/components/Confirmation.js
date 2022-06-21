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
    </div>
  );
};

export default Confirmation;
