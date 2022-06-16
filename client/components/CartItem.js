import React from "react";
import { Link } from "react-router-dom";

const CartItem = (props) => {
  const { product, handleQtyChange, removeFromCart } = props;

  return (
    <div key={product.id}>
      <Link to={`/products/${product.id}`}>
        <img src={product.imageURL} alt="image of cookie" />
        <h4>{product.name}</h4>
        <p>{product.price}</p>
      </Link>
      <select
        value={product.qty}
        onChange={(e) => handleQtyChange(product, e.target.value)}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <button onClick={() => removeFromCart(product.id)}>
        Remove From Cart
      </button>
    </div>
  );
};

export default CartItem;
