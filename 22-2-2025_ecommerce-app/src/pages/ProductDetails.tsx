import React from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../context/StoreContext";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useStore();
  const product = state.products.find(p => p.id === Number(id));

  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} width="200" />
      <p>${product.price}</p>
      <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
