import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editProduct, deleteProduct } from '../store/allProducts';

export const UpdateProduct = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: '',
    price: 0,
    inventory: 0,
    imageURL: '',
    description: '',
  });

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(editProduct(values));
        }}
      >
        <input name="name" type="text" placeholder="Name" value={values.name} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" value={values.price} onChange={handleChange} />
        <input name="inventory" type="number" placeholder="Inventory" value={values.inventory} onChange={handleChange} />
        <input name="description" type="text" placeholder="Description" value={values.description} onChange={handleChange} />
        <input name="imageURL" type="text" placeholder="Image URL" value={values.imageURL} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => deleteProduct()}>Delete</button>
    </div>
  );
};

export default UpdateProduct;
