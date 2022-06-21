const router = require("express").Router();
const {
  models: { Order, Product, User, OrderItem },
} = require("../db");
const { requireToken } = require("./gateKeeperMiddleware");

router.get("/", requireToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.headers.user);

    const pendingOrder = await Order.findOne({
      where: {
        userId: user.id,
        status: "Pending",
      },
      include: [{ model: Product }],
    });

    if (!pendingOrder) {
      res.send([]);
    } else {
      const returnData = pendingOrder.products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          imageURL: product.imageURL,
          price: product.price,
          inventory: product.inventory,
          qty: product["order-items"].qty,
        };
      });

      res.send(returnData);
    }
  } catch (err) {
    console.error(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.findByPk(req.headers.user, {
      include: [{ model: Order }],
    });

    const pendingOrder = user.orders.find(
      (order) => order.status === "Pending"
    );

    let order;
    if (!pendingOrder) {
      order = await user.createOrder();
    } else {
      order = pendingOrder;
    }

    const product = await Product.findByPk(req.body.product.id);
    await OrderItem.create({
      productId: product.id,
      orderId: order.id,
      qty: req.body.qty,
    });
    const cart = await order.getProducts();

    res.send({ product, cart });
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.headers.user, {
      include: [{ model: Order }],
    });

    const pendingOrder = user.orders.find(
      (order) => order.status === "Pending"
    );

    const products = await pendingOrder.getProducts({
      where: { id: req.params.id },
    });
    await pendingOrder.removeProduct(products[0]);

    res.send(pendingOrder);
  } catch (err) {
    console.error(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.headers.user, {
      include: [{ model: Order }],
    });

    const pendingOrder = user.orders.find(
      (order) => order.status === "Pending"
    );

    const cartItem = await OrderItem.findOne({
      where: {
        productId: req.params.id,
        orderId: pendingOrder.id,
      },
    });

    await cartItem.update({
      qty: req.body.qty,
    });

    const product = await Product.findByPk(req.params.id);

    res.send({ product, cart: pendingOrder });
  } catch (err) {
    console.error(err);
  }
});


module.exports = router;
