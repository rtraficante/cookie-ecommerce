// import React, { useEffect } from "react";
// import { fetchProducts } from "../store/allProducts";
// import { addToCart } from "../store/cart";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useHistory } from "react-router-dom";
// import { Box, Button, Container, Grid } from "@material-ui/core";
// import { useProductStyles } from "../theme";
// import SingleProductCard from "./SingleProductCard";

// function AllProducts() {
//   const products = useSelector((state) => state.allProducts);
//   const history = useHistory();

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, []);

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//     history.push("/cart");
//   };

//   const classes = useProductStyles();
//   return (
//     <Container maxWidth="lg" sx={{ marginY: 12 }}>
//       <Grid container spacing={5}>
//         {products.map((product) => {
//           return (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
//               <SingleProductCard product={product} />
//               <Button href={`/products/${product.id}`}>View details</Button>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Container>
//   );
// }

// export default AllProducts;


import React, { useEffect } from "react";
import { fetchProducts } from "../store/allProducts";
import { addToCart } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Box, Button, Container, Grid } from "@material-ui/core";
import { useProductStyles } from "../theme";
import SingleProductCard from "./SingleProductCard";
import SideSwipeBar from "./SideSwipeBar";

function AllProducts() {
  const products = useSelector((state) => state.allProducts);
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    history.push("/cart");
  };
  
  // const handleFilter = (event) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     [event.target.name]: event.target.value,
  //   }));
  // }

  const classes = useProductStyles();
  return (
    <Container maxWidth="lg" sx={{ marginY: 12 }}>
      <Grid container spacing={5}>
        {products.map((product) => {
          <SideSwipeBar category={product.category}/>
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <SingleProductCard product={product} />
              <Button href={`/products/${product.id}`}>View details</Button>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default AllProducts;