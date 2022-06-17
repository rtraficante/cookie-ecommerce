import React, { useEffect, useState } from "react";
import { fetchProduct } from "../store/singleProduct";
import { addToCart } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";

function SingleProduct(props) {
  const product = useSelector((state) => state.singleProduct);
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  useEffect(() => {
    const { id } = props.match.params;
    dispatch(fetchProduct(id));
  }, []);

  const handleAddToCart = () => {
    dispatch(addToCart(product, qty));
    props.history.push("/cart");
  };

  const handleQtyChange = (event) => {
    setQty(event.target.value);
  };

  return (
    <div>
      <img src={product.imageURL} alt="Image of cookie" />
      <h4>{product.name}</h4>
      <p>{product.price}</p>
      <p>Description: {product.description}</p>
      <select value={qty} onChange={handleQtyChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <button onClick={handleAddToCart}>Add To Cart</button>
    </div>
  );
}

export default SingleProduct;
