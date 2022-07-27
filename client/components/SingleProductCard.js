import React, { useEffect, useState } from "react";
import { fetchProduct } from "../store/singleProduct";
import { addToCart, editCart } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

function SingleProductCard({ product, cartItem, handleCartQty }) {
  // const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  let [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    console.log(product, qty);
    dispatch(addToCart(product, qty));

    history.push("/cart");
  };

  const mapInventory = (num) => {
    const nums = [];
    for (let i = 1; i <= num; i++) {
      nums.push(i);
    }
    return nums;
  };

  const handleQtyChange = (e) => {
    setQty(e.target.value);
  };

  const { imageURL, name, price, inventory } = product;

  return (
    <div className="flex flex-col justify-center  p-4 m-4 border rounded-md w-[280px] max-w-[280px]">
      <h2 className="text-center font-bold text-lg">{name}</h2>
      <img
        className="max-h-[240px] border mt-2 rounded-lg"
        src={imageURL}
        alt="image of cookie"
      />
      <div className="my-4 flex justify-between items-center">
        <p>
          <strong>Price:</strong> ${price}
        </p>
        <div className="flex items-center">
          <p className="text-center mr-2 font-bold">QTY:</p>
          <select
            className="border-2 rounded-xl p-2"
            onChange={
              cartItem
                ? (e) => handleCartQty(product, e.target.value)
                : handleQtyChange
            }
          >
            {mapInventory(inventory).map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </div>
      {cartItem ? null : (
        <div className="flex justify-between">
          <button
            className="py-2 px-4 bg-blue-700 text-white rounded-lg hover:opacity-80 hover:scale-105 ease-in duration-150"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          <button
            onClick={() => history.push(`/products/${product.id}`)}
            className="py-2 px-4 bg-blue-400 text-white rounded-lg hover:opacity-80 hover:scale-105 ease-in duration-150"
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );
}

export default SingleProductCard;
