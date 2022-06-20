const Sequelize = require("sequelize");
const db = require("../db");

const OrderItem = db.define("order-items", {
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = OrderItem;
