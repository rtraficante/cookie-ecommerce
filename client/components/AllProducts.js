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

  const filterCategory = (products) => {
    let arr = ["all"];
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      if (!arr.includes(product["category"])) {
        arr.push(product["category"]);
      }
    }
    return arr;
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-start">
        <div className="m-2 flex items-center">
          <h2 className="font-bold mr-2">Category</h2>
          <select
            className="border-2 p-2 rounded-md"
            onChange={(e) => setFilter(e.target.value)}
          >
            {filterCategory(products).map((category, i) => (
              <option value={category} key={i}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center flex-wrap items-center max-w-[1300px]">
          {filter !== "all"
            ? products
                .filter((product) => filter === product.category)
                .map((product) => {
                  return (
                    <div>
                      <SingleProductCard product={product} />
                      <Box style={{ padding: 1 }} />
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
      </div>
    </div>
  );
}

export default AllProducts;
