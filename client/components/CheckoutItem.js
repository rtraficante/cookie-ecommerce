import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const CheckoutItem = (props) => {
  const { product } = props;

  return (
    <Link to={`/products/${product.id}`} className="checkout-item ">
      <div className="checkout-details mt-4">
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="body1">
          Price: ${product.price} x {product.qty} = $
          {product.price * product.qty}
        </Typography>
      </div>
    </Link>
  );
};

export default CheckoutItem;
