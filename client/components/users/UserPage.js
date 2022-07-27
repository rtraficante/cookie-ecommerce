import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/cart";

const UserPage = () => {
  const user = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders(user));
  }, [user]);

  const orderTotal = (order) => {
    let result = 0;
    const length = order?.products?.length;
    for (let i = 0; i < length; i++) {
      result += order.products[i].price * order.products[i][`order-items`].qty;
    }
    return result;
  };

  return (
    <div>
      <div className="flex justify-between border border-gray-400 rounded-md p-4 my-2 mx-6">
        <h2>Order ID</h2>
        <h2>Order Date</h2>
        <h2>Total Price</h2>
      </div>
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex justify-between border border-gray-400 rounded-md p-4 my-2 mx-6"
        >
          <h2>{order.id}</h2>
          <h2>{new Date(order.createdAt).toDateString()}</h2>
          <h2>${orderTotal(order)}</h2>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
