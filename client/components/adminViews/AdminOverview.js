import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

//To do
//Links to buttons or some sort of clickable graphic
const AdminOverview = () => {
  return (
    <div>
      <h1>Admin Tools</h1>
      <h2>
        <Link to="/products">All Products</Link>
      </h2>
      <h2>
        <Link to="/admin/products/add">Add Product</Link>
      </h2>
      <h2>
        <Link to="/admin/users">All users</Link>
      </h2>
    </div>
  );
};

export default AdminOverview;
