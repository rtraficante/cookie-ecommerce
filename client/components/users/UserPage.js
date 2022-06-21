import React from "react";
import { useSelector } from "react-redux";

const UserPage = () => {
  const user = useSelector((state) => state.auth);

  return <div>{user.firstName}</div>;
};

export default UserPage;
