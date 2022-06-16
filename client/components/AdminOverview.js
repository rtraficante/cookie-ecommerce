import React from "react";
import { Link } from "react-router-dom";

const AdminOverview = () => {
  return (
    <div>
      Admin Overview
      <Link to="/admin/products/add">Add Product</Link>
    </div>
  );
};

export default AdminOverview;
