import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
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
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
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
          return accum + val.price;
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
        <form onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <div className="form-row">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <Button type="submit" color="primary" variant="contained">
            Complete Payment
          </Button>
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
