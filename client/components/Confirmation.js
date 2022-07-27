import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CheckoutItem from "./CheckoutItem";
import { useHistory } from "react-router-dom";

const Confirmation = () => {
  const order = useSelector((state) => state.cart);
  const history = useHistory();

  const totalPrice = order.reduce((accum, val) => {
    return (accum += val.price * val.qty);
  }, 0);

  return (
    <div className="flex flex-col items-center">
      <div>
        <h2 className="text-2xl">
          Thank you for ordering one of our world's famous cookies!
        </h2>
      </div>

      <div className="mt-8 border-2 p-4 m-4 w-[400px] md:w-full md:max-w-[620px]">
        <h2 className="text-center text-xl">Order Summary</h2>

        <div className="checkout-products">
          {order.map((item) => (
            <CheckoutItem key={item.id} product={item} />
          ))}
          Total: ${totalPrice}
        </div>
      </div>
      <div className="mt-4">
        <button
          className="rounded-md bg-blue-600 py-2 px-6 drop-shadow-lg text-white"
          onClick={() => history.push("/")}
        >
          Back To Home
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
