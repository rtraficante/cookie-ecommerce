const router = require("express").Router();
const {
  models: { Cart, Product, User },
} = require("../db");

router.get("/", async (req, res) => {
  try {
    // const cart = user.getCart();
    // res.send(cart);
  } catch (err) {
    console.error(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.findByPk(req.body.id);
    const cart = await Cart.create();

    await cart.addProduct(product);
    res.send(cart);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
