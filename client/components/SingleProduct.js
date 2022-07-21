import React, { useEffect, useState } from "react";
import { fetchProduct } from "../store/singleProduct";
import { addToCart } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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

  const mapInventory = (num) => {
    const nums = [];
    for (let i = 1; i <= num; i++) {
      nums.push(i);
    }
    return nums;
  };

  const handleQtyChange = (event) => {
    setQty(event.target.value);
  };

  const { imageURL, name, price, description, inventory } = product;
  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className="flex justify-around border-2 py-8 w-5/6">
          <img
            className="max-w-[400px] rounded-md drop-shadow-md"
            src={imageURL}
          />
          <div className="mt-32 w-1/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-4xl">{name}</h2>
              <p className="text-red-600 text-2xl">${price}</p>
            </div>
            <p>{description}</p>
            <div className="flex mt-40 items-center">
              <p>QTY:</p>
              <select
                className="border-2 rounded-xl p-2 px-4 ml-2"
                onChange={handleQtyChange}
              >
                {mapInventory(inventory).map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <button
                className="py-2 px-4 ml-8 bg-blue-700 text-white rounded-lg"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
