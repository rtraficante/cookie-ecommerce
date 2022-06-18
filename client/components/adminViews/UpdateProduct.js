import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, deleteProduct } from "../../store/allProducts";
import { fetchProduct } from "../../store/singleProduct";
import { useHistory, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const id = params.id;

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, []);

  const product = useSelector((state) => {
    return state.singleProduct;
  });

  useEffect(() => {
    if (product.name) setName(product.name);
    if (product.price) setPrice(product.price);
    if (product.inventory) setInventory(product.inventory);
    if (product.imageURL) setImageURL(product.imageURL);
    if (product.description) setDescription(product.description);
  }, [product]);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(editProduct({ ...product, name, price, inventory, description, imageURL }, history));
  };

  return (
    <div>
      <form id="edit-product-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Price:
          <input name="price" type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label>
          Inventory:
          <input name="inventory" type="number" placeholder="Inventory" value={inventory} onChange={(e) => setInventory(e.target.value)} />
        </label>
        <label>
          Description:
          <input name="description" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Image URL:
          <input name="imageURL" type="text" placeholder="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p></p>
      <button
        onClick={() => {
          dispatch(deleteProduct(id, history));
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default UpdateProduct;
