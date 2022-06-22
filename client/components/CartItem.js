import React from "react";
import { Link } from "react-router-dom";
import SingleProductCard from "./SingleProductCard";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const CartItem = (props) => {
  const { product, removeFromCart } = props;

  return (
    <div key={product.id}>
      <SingleProductCard product={product} />
      <div style={{ paddingTop: 3 }}>
        <Button variant="contained" color="primary" onClick={() => removeFromCart(product.id)}>
          Remove From Cart
        </Button>
      </div>
    </div>
  );
};

export default CartItem;

/* <select value={product.qty} onChange={(e) => handleQtyChange(product, e.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select> */
