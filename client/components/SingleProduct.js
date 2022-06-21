import React, { useEffect, useState } from "react";
import { fetchProduct } from "../store/singleProduct";
import { addToCart } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { useProductStyles } from "../theme";

function SingleProduct(props) {
  const product = useSelector((state) => state.singleProduct);
  const dispatch = useDispatch();

  let [qty, setQty] = useState(1);

  useEffect(() => {
    const { id } = props.match.params;
    dispatch(fetchProduct(id));
  }, []);

  const handleAddToCart = () => {
    dispatch(addToCart(product, qty));
  };

  const handleQtyChange = (event) => {
    setQty(event.target.value);
  };

  const classes = useProductStyles();
  const { imageURL, name, price, description } = product;
  return (
    <>
      <img src={imageURL} alt="Image of cookie" />
      <h4>{name}</h4>
      <p>{price}</p>
      <p>Description: {description}</p>
      <select value={qty} onChange={handleQtyChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <button onClick={handleAddToCart}>Add To Cart</button>
    </>
  );
}

export default SingleProduct;

/*
 <>
      <img className={classes.image} src={imageURL} alt="Image of cookie" />
      <h4>{name}</h4>
      <p>{price}</p>
      <p>Description: {description}</p>
      <select value={qty} onChange={handleQtyChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <button onClick={handleAddToCart}>Add To Cart</button>
    </>
*/
