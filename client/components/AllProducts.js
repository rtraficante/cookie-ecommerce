import React, { useEffect } from "react";
import { fetchProducts } from "../store/allProducts";
import { addToCart } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Box, Button, Container, Grid } from "@material-ui/core";
import { useProductStyles } from "../theme";
import SingleProductCard from "./SingleProductCard";
import SideSwipeBar from "./SideSwipeBar";
import { useState } from "react";

function AllProducts() {
  const products = useSelector((state) => state.allProducts);
  const history = useHistory();

  const [filter, setFilter] = useState("all");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <SideSwipeBar setFilter={setFilter} />
      <Container maxWidth="lg" sx={{ marginY: 12 }}>
        <Grid container spacing={5} style={{ justifyContent: "space-around" }}>
          {filter !== "all"
            ? products
                .filter((product) => filter === product.category)
                .map((product) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                      <SingleProductCard product={product} />
                      <Box style={{ padding: 1 }} />
                      <Button variant="contained" color="primary" href={`/products/${product.id}`}>
                        View details
                      </Button>
                    </Grid>
                  );
                })
            : products.map((product) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <SingleProductCard product={product} />
                    <Box style={{ padding: 1 }} />
                    <Button variant="contained" color="primary" href={`/products/${product.id}`}>
                      View details
                    </Button>
                  </Grid>
                );
              })}
        </Grid>
      </Container>
    </>
  );
}

export default AllProducts;
