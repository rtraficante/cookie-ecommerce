import React from "react";
import { Link } from "react-router-dom";
import SingleProductCard from "./SingleProductCard";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

const CartItem = (props) => {
  const { item, handleRemoveFromCart, handleCartQty, mapInventory } = props;

  return (
    <div className="my-4 flex space-x-6 border-b pb-4 flex-1">
      <img className="w-44 h-44" src={item.imageURL} />
      <div className="flex flex-col items-start justify-evenly">
        <h2 className="text-2xl">{item.name}</h2>
        <h5 className="text-red-600">${item.price}</h5>
        <select
          className="border-2 rounded-xl p-2"
          onChange={(e) => handleCartQty(item, e.target.value)}
          value={item.qty}
        >
          {mapInventory(item.inventory).map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
        <h2>
          <strong>Total: </strong>${item.price * item.qty}
        </h2>
      </div>
      <div className="flex-1">
        <h2
          className="text-right cursor-pointer"
          onClick={() => handleRemoveFromCart(item.id)}
        >
          <CloseIcon className="hover:opacity-40 hover:scale-125" />
        </h2>
      </div>
    </div>
  );
};

export default CartItem;
