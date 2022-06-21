const router = require("express").Router();
const {
  models: { Order, User, Product },
} = require("../db");

router.post("/", async (req, res) => {
  try {
    const user = await User.findByPk(req.headers.user);

    const cart = await Order.findOne({
      where: {
        userId: user.id,
        status: "Pending",
      },
      include: [{ model: Product }],
    });

    await cart.update({
      status: "Purchased",
    });

    res.send(cart);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
