import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/allProducts";
import { Button } from "@material-ui/core";

export const AddProduct = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: "",
    price: 0,
    inventory: 0,
    imageURL: "",
    description: "",
  });

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        dispatch(addProduct(values));
      }}
    >
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={values.name}
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={values.price}
        onChange={handleChange}
      />
      <input
        name="inventory"
        type="number"
        placeholder="Inventory"
        value={values.inventory}
        onChange={handleChange}
      />
      <input
        name="description"
        type="text"
        placeholder="Description"
        value={values.description}
        onChange={handleChange}
      />
      <input
        name="imageURL"
        type="text"
        placeholder="Image URL"
        value={values.imageURL}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AddProduct;
