import React, { useEffect } from "react";
import { fetchProducts } from "../store/allProducts";
import { connect } from "react-redux";

function AllProducts(props) {
  const { products, loadProducts } = props;

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

const mapState = (state) => ({
  products: state.allProducts,
});

const mapDispatch = (dispatch) => ({
  loadProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(AllProducts);
