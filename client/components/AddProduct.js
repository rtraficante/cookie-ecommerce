import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/allProducts";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export const AddProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [values, setValues] = useState({
    name: "",
    price: 0,
    inventory: 0,
    description: "",
    imageURL: "",
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
      id="add-product-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (values.imageURL === "") values.imageURL = undefined;
        dispatch(addProduct(values, history));
      }}
    >
      <label>
        Name:
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Price:
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={values.price}
          onChange={handleChange}
        />
      </label>
      <label>
        Inventory:
        <input
          name="inventory"
          type="number"
          placeholder="Inventory"
          value={values.inventory}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input
          name="description"
          type="text"
          placeholder="Description"
          value={values.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Image URL:
        <input
          name="imageURL"
          type="text"
          placeholder="Image URL"
          value={values.imageURL}
          onChange={handleChange}
        />
      </label>
      <p></p>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AddProduct;
