import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripeTestPromise = loadStripe(
  "pk_test_51LDBLhL5DnX6BuqIXxswtW44aAg0Ux6jif6SsWDTNCGWoh9cdzzzDa5WeY3sQF0bxBZWMBKMvfylw2CWeISpnZuY00SFWXhvlO"
);

const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
