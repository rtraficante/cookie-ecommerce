const router = require("express").Router();
const {
  models: { Order, Product, User },
} = require("../db");

router.post("/", async (req, res) => {
  try {
    const user = await User.findByPk(req.headers.user, {
      include: [{ model: Order }],
    });

    if (user.orders.length === 0) {
      await user.createOrder();
    }
    const order = await user.getOrders({ where: { status: "Pending" } });

    const product = await Product.findByPk(req.body.id);
    await order[0].addProduct(product);
    const cart = await order[0].getProducts();

    res.send({ product, cart });
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.headers.user);
    const orders = await user.getOrders({ where: { status: "Pending" } });

    const cart = orders[0];

    const products = await cart.getProducts({ where: { id: req.params.id } });
    await cart.removeProduct(products[0]);

    res.send(cart);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
