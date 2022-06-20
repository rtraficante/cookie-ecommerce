import { useDispatch } from "react-redux";
import { addProduct } from "../store/allProducts";

export const addProduct = (product) => {
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={() => {
        dispatch(addProduct);
      }}
    ></form>
  );
};

export default addProduct;
