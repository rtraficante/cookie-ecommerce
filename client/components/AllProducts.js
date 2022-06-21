import React, { useEffect } from "react";
import { fetchProducts } from "../store/allProducts";
import { addToCart } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Box, Button, Paper, Container, Grid, Card } from "@material-ui/core";
import { useProductStyles } from "../theme";
// import SideSwipeBar from "./SideSwipeBar";
import SingleProduct from "./SingleProduct";

function AllProducts(props) {
  const products = useSelector((state) => state.allProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    props.history.push("/products");
  };

  const classes = useProductStyles();
  return (
    <Container maxWidth="lg" sx={{ marginY: 12 }}>
      <Grid container spacing={5}>
        {products.map((product) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <SingleProduct product={product} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default AllProducts;

/*
   <div className="all-products">
      {products.map((product) => (
        <div key={product.id}>
          <Link to={`/products/${product.id}`}>
            <img src={product.imageURL} alt="image of cookie" />
            <h4>{product.name}</h4>
            <p>{product.price}</p>
          </Link>
          <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
        </div>
      ))}
    </div>
*/
