import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/cart";
// import { useState } from "react";

const UserPage = () => {
  const user = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect((getState) => {
    if (getState().auth.id) dispatch(getAllOrders());
  }, []);
  console.log(orders);
  return (
    <div>
      {orders.map((order) => (
        <div>{order.id}</div>
      ))}
    </div>
  );
};

export default UserPage;
