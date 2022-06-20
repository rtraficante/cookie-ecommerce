import React, { useEffect } from 'react';
import { fetchProduct } from '../store/singleProduct';
import { useDispatch, useSelector } from 'react-redux';

function SingleProduct(props) {
  const product = useSelector((state) => state.singleProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    const { id } = props.match.params;
    dispatch(fetchProduct(id));
  }, []);

  return (
    <div>
      <img src={product.imageURL} alt="Image of cookie" />
      <h4>{product.name}</h4>
      <p>{product.price}</p>
      <p>Description: {product.description}</p>
    </div>
  );
}

export default SingleProduct;
