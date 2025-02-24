import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api";
import CategorySelector from "./CategorySelector";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "../style.css"; 

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

const ProductList = () => {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Explore Products</h1>

      
      <CategorySelector />

     
      {isLoading && <p className="text-center text-secondary mt-4">Loading products...</p>}
      {error && <p className="text-center text-danger mt-4">Error loading products.</p>}

      <div className="row">
        {products?.map((product) => (
          <div key={product.id} className="col-md-4 col-lg-3 mb-4">
            <div className="card product-card shadow-sm">
              <Link to={`/product/${product.id}`} className="text-decoration-none">
                <img src={product.image} className="card-img-top product-image" alt={product.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-dark text-truncate">{product.title}</h5>
                  <p className="card-text text-primary fw-bold">${product.price.toFixed(2)}</p>
                  <button className="btn btn-primary mt-auto">View Details</button>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
