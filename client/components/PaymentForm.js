import React, { useState } from "react";
import {
  CardElement,
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { checkout } from "../store/checkout";
import axios from "axios";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "blue",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "blue" },
      "::placeholder": { color: "gray" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const PaymentForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const totalPrice = cart.reduce((accum, val) => {
          return (accum += val.price * val.qty);
        }, 0);
        const { id } = paymentMethod;
        const { data } = await axios.post("/api/payment", {
          amount: totalPrice * 100,
          id,
        });
        dispatch(checkout(cart));

        if (data.success) {
          console.log("successful payment");
          setSuccess(true);
          history.push("/confirmation");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <fieldset className="form-group">
            <div className="form-row mt-4">
              <CardElement
                options={CARD_OPTIONS}
                className="w-[420px] border-2 rounded-md py-2 px-1"
              />
            </div>
          </fieldset>

          <button
            type="submit"
            className="bg-blue-600 py-3 px-20 text-white rounded-lg drop-shadow-lg mt-4"
          >
            Complete Payment
          </button>
        </form>
      ) : (
        <div>
          <h2>redirecting...</h2>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
