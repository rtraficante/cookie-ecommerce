import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/cart";
// import { useState } from "react";

const UserPage = () => {
  const user = useSelector((state) => state.auth);
  const grabOrders = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const orders = grabOrders || [];
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  console.log(orders);
  return (
    <div>
      {orders.map((order, i) => (
        <div key={i}>{order.id}</div>
      ))}
    </div>
  );
};

export default UserPage;
