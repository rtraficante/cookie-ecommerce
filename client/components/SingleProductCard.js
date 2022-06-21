import React, { useEffect, useState } from "react";
import { fetchProduct } from "../store/singleProduct";
import { addToCart } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { useProductStyles } from "../theme";
import { Card, Box, CardMedia, CardContent, CardHeader, CardActions, Typography, IconButton, Tooltip } from "@material-ui/core";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

function SingleProductCard({ product }) {
  // const product = useSelector((state) => state.singleProduct);
  const dispatch = useDispatch();

  let [qty, setQty] = useState(1);

  // useEffect(() => {
  //   const { id } = props.match.params;
  //   dispatch(fetchProduct(product.id));
  // }, []);

  const handleAddToCart = () => {
    dispatch(addToCart(product, qty));
  };

  // const handleQtyChange = (event) => {
  //   setQty(event.target.value);
  // };

  const addOne = () => setQty(qty++);
  const minusOne = () => setQty(qty--);

  const classes = useProductStyles();
  const { imageURL, name, price, description } = product;
  return (
    <Card elevation={3} style={{ display: "flex grow", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "linear-gradient(to right top, pink, white, orange)" }}>
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
