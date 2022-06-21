const router = require("express").Router();
const {
  models: { Order, User },
} = require("../db");

router.post("/", async (req, res) => {
  try {
    const user = await User.findByPk(req.headers.user, {
      include: [{ model: Order }],
    });

    const cart = user.orders.find((order) => order.status === "Pending");

    await cart.update({
      status: "Purchased",
    });

    res.send(cart);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
