import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  if (isLoading) return <p className="text-center text-secondary mt-4">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-4">Error loading product details</p>;

  return (
    <div className="container mt-5">
      <div className="row">
       
        <div className="col-md-6 d-flex justify-content-center">
          <img src={product?.image} alt={product?.title} className="img-fluid product-detail-image" />
        </div>

        
        <div className="col-md-6">
          <h2 className="text-primary fw-bold">{product?.title}</h2>
          <p className="text-muted">{product?.description}</p>
          <h4 className="text-success fw-bold">${product?.price.toFixed(2)}</h4>

          <div className="mt-4">
            {/* <button className="btn btn-warning me-2">Add to Cart</button> */}
            <Link to="/" className="btn btn-secondary">Back to Products</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
