const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Pending",
  },
});

module.exports = Cart;
