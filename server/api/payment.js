const stripe = require("stripe")(
  "sk_test_51LDBLhL5DnX6BuqIUqXOHwkBSMrRdIJfXDuBZBCt9tyR8rzZjGpPhM29JGNfhruBlXegzUD6NWsMYfprO65UDGNp00Dn9pMlOF"
);
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const { amount, id } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "cookie",
      payment_method: id,
      confirm: true,
    });

    console.log("Payment ", payment);
    res.json({
      message: "Payment Successful",
      success: true,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
