import React from "react";
import { Link } from "react-router-dom";
import SingleProductCard from "./SingleProductCard";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const CartItem = (props) => {
  const { product, removeFromCart, handleQtyChange } = props;

  return (
    <div key={product.id}>
      <SingleProductCard product={product} handleQtyChange={handleQtyChange} cartItem={true} />
      <div style={{ paddingTop: 3 }}>
        <Button variant="contained" color="primary" onClick={() => removeFromCart(product.id)}>
          Remove From Cart
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
