const stripe = require("stripe")(process.env.STRIPE);
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    console.log(process.env);
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
