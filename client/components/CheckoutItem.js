import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const CheckoutItem = (props) => {
  const { product } = props;

  return (
    <Link to={`/products/${product.id}`} className="checkout-item">
      <img src={product.imageURL} alt="image of cookie" />
      <div className="checkout-details">
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="body1">
          Price: ${product.price} x {product.qty}
        </Typography>
        <Typography variant="body1">
          Total: ${product.price * product.qty}
        </Typography>
      </div>
    </Link>
  );
};

export default CheckoutItem;
