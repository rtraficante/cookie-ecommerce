import React, { useEffect, useState } from "react";
import { fetchProduct } from "../store/singleProduct";
import { addToCart, editCart } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useProductStyles } from "../theme";
import { Card, Box, CardMedia, CardContent, CardHeader, CardActions, Typography, IconButton, Tooltip } from "@material-ui/core";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

function SingleProductCard({ product }) {
  const dispatch = useDispatch();
  const history = useHistory();

  let [qty, setQty] = useState(0);
  let [cartQty, setCartQty] = useState(product.qty);

  const handleAddToCart = () => {
    dispatch(addToCart(product, qty));
    // history.push("/cart");
  };

  const handleQtyChange = (product, qty) => {
    dispatch(editCart(product, qty));
  };

  const addOne = () => {
    setQty(qty++);
    handleQtyChange(product, qty);
  };
  const minusOne = () => {
    setQty(qty--);
    handleQtyChange(product, qty);
  };

  const classes = useProductStyles();
  const { imageURL, name, price, description } = product;
  return (
    <Card elevation={3} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "90%", background: "linear-gradient(to right top, pink, white, orange)" }}>
      <CardHeader title={<Typography className={classes.h4}>{name}</Typography>} align="center" />
      <CardMedia image={imageURL} title={name} className={classes.image} />
      <CardContent>
        <Typography className={classes.p}>{description}</Typography>
        <Typography className={classes.p}>${price}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Add to cart">
          <IconButton aria-label="Add to cart" onClick={handleAddToCart}>
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Remove">
          <RemoveIcon fontSize="medium" onClick={minusOne} />
        </Tooltip>
        {qty}
        <Tooltip title="Add">
          <AddIcon fontSize="medium" onClick={addOne} />
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default SingleProductCard;
