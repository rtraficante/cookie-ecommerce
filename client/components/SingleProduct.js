import React, { useEffect, useState } from "react";
import { fetchProduct } from "../store/singleProduct";
import { addToCart } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Typography, Card, CardMedia, CardContent, CardHeader, CardActions, Tooltip, IconButton, CssBaseline, Container } from "@material-ui/core";
import { useProductStyles } from "../theme";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

function SingleProduct(props) {
  const history = useHistory();
  const product = useSelector((state) => state.singleProduct);
  const dispatch = useDispatch();

  let [qty, setQty] = useState(1);

  useEffect(() => {
    const { id } = props.match.params;
    dispatch(fetchProduct(id));
  }, []);

  const handleAddToCart = () => {
    dispatch(addToCart(product, qty));
    history.push("/products");
  };

  const addOne = () => setQty(qty++);
  const minusOne = () => setQty(qty--);
  const handleQtyChange = (event) => {
    setQty(event.target.value);
  };

  const classes = useProductStyles();
  const { imageURL, name, price, description } = product;
  return (
    <Container maxWidth="lg">
      <Card xs={12} md={6} lg={3} elevation={3} style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "auto", background: "linear-gradient(to right top, pink, white, orange)" }}>
        <CardHeader align="center" title={<Typography className={classes.h4}>{name}</Typography>} />
        <CardMedia component="img" alt="img of cookie" image={imageURL} title={name} className={classes.media} />
        <CardContent>
          <Typography className={classes.p}>{description}</Typography>
          <Typography className={classes.p}>${price}</Typography>
        </CardContent>
        <CardActions>
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
    </Container>
  );
}

export default SingleProduct;
