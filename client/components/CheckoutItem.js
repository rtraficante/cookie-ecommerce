import { ListItem } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const CheckoutItem = (props) => {
  const { product } = props;

  return (
    <div className="mt-4 w-3/4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src={product.imageURL} className="w-16 h-16 rounded-md border" />
        <h2 className="text-md font-bold">{product.name}</h2>
        <p>x{product.qty}</p>
      </div>

      <p className="font-bold">${product.price * product.qty}</p>
    </div>
  );
};

export default CheckoutItem;
