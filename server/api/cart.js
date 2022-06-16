const router = require("express").Router();
const {
  models: { Order, Product, User },
} = require("../db");


router.post("/", async (req, res) => {
  try {
    const user = await User.findByPk(req.headers.user);
    const order = await user.getOrder();

    const product = await Product.findByPk(req.body.id);
    order.addProduct(product);

    res.send({ product, order });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
