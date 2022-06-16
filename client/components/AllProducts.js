import React, { useEffect } from 'react';
import { fetchProducts } from '../store/allProducts';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function AllProducts() {
  const products = useSelector((state) => state.allProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div>
      {products.map((product) => (
        <Link to={`/products/${product.id}`} key={product.id}>
          <img src={product.imageURL} alt="image of cookie" />
          <h4>{product.name}</h4>
          <p>{product.price}</p>
          <button>Add To Cart</button>
        </Link>
      ))}
    </div>
  );
}

export default AllProducts;
