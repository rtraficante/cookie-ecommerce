const router = require("express").Router();
const {
  models: { Order, Product, User, OrderItem },
} = require("../db");

router.post("/", async (req, res) => {
  try {
    const user = await User.findByPk(req.headers.user, {
      include: [{ model: Order }],
    });

    const pendingOrders = user.orders.filter(
      (order) => order.status === "Pending"
    );

    let order;
    if (pendingOrders.length === 0) {
      order = await user.createOrder();
    } else {
      order = pendingOrders[0];
    }

    const product = await Product.findByPk(req.body.id);
    await order.addProduct(product);
    const cart = await order.getProducts();

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
