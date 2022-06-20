const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr4r9PRE74oLi8wbRFJaKe-xoDrMpEK7jdLoU2_ahPNJ5GGJeQYhRztY2nxyKVnLf645A&usqp=CAU",
    validate: {
      isEmptyString(value) {
        if (value === "")
          value =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr4r9PRE74oLi8wbRFJaKe-xoDrMpEK7jdLoU2_ahPNJ5GGJeQYhRztY2nxyKVnLf645A&usqp=CAU";
      },
    },
  },
});

module.exports = Product;
