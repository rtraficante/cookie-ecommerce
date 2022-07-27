import React, { useEffect } from "react";
import { Link } from "react-router-dom";

//To do
//Links to buttons or some sort of clickable graphic
const AdminOverview = () => {
  return (
    <div className="flex justify-center">
      <div className="mt-12 flex flex-col items-center border rounded-sm shadow-md p-4 space-y-4 w-1/2">
        <h1 className="font-bold text-xl">Admin Menu</h1>

        <Link
          className="text-blue-400 cursor-pointer hover:underline"
          to="/products"
        >
          All Products
        </Link>

        <Link
          className="text-blue-400 cursor-pointer hover:underline"
          to="/admin/products/add"
        >
          Add Product
        </Link>

        <Link
          className="text-blue-400 cursor-pointer hover:underline"
          to="/admin/users"
        >
          All users
        </Link>
      </div>
    </div>
  );
};

export default AdminOverview;
