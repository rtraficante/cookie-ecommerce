const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

// GET /products - fetches all products in database
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
