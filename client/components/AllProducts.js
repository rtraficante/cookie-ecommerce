import React, { useEffect } from "react";
import { fetchProducts } from "../store/allProducts";
import { addToCart } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Box, Button, Container, Grid } from "@material-ui/core";
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
      <div>
        <select>
          
        </select>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {filter !== "all"
          ? products
              .filter((product) => filter === product.category)
              .map((product) => {
                return (
                  <div>
                    <SingleProductCard product={product} />
                    <Box style={{ padding: 1 }} />
                    <Button
                      variant="contained"
                      color="primary"
                      href={`/products/${product.id}`}
                    >
                      View details
                    </Button>
                  </div>
                );
              })
          : products.map((product) => {
              return (
                <div key={product.id}>
                  <SingleProductCard product={product} />
                </div>
              );
            })}
      </div>
    </>
  );
}

export default AllProducts;
