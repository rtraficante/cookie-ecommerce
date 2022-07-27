import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/allProducts";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export const AddProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [values, setValues] = useState({
    name: "",
    price: 0,
    category: "",
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
    <div className="flex justify-center">
      <form
        id="add-product-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (values.imageURL === "") values.imageURL = undefined;
          dispatch(addProduct(values, history));
        }}
        className="flex flex-col w-full m-2 border shadow-sm rounded-md p-6 px-8 space-y-4 max-w-[680px]"
      >
        <h2 className="font-bold text-lg">Add Product</h2>
        <input
          name="name"
          type="text"
          placeholder="Product Name"
          value={values.name}
          onChange={handleChange}
          className="p-4 py-2 border rounded-md border-gray-400 "
        />
        <div className="flex flex-col">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Price"
            value={values.price}
            onChange={handleChange}
            className="p-4 py-2 border rounded-md border-gray-400 "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="inventory">Inventory</label>
          <input
            id="inventory"
            name="inventory"
            type="number"
            placeholder="Inventory"
            value={values.inventory}
            onChange={handleChange}
            className="p-4 py-2 border rounded-md border-gray-400 "
          />
        </div>
        <input
          name="description"
          type="text"
          placeholder="Description"
          value={values.description}
          onChange={handleChange}
          className="p-4 py-2 border rounded-md border-gray-400 "
        />
        <input
          name="imageURL"
          type="text"
          placeholder="Image URL"
          value={values.imageURL}
          onChange={handleChange}
          className="p-4 py-2 border rounded-md border-gray-400 "
        />
        <p></p>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
