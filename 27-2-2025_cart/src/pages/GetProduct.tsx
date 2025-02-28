import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api/api";

const GetProduct: React.FC = () => {
  const [productId, setProductId] = useState<number | null>(null);
  const { data: product, refetch } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId!),
    enabled: false,
  });

  return (
    <div className="p-6 ml-64">
      <h1 className="text-2xl font-bold mb-4">Get Product</h1>

      <div className="mb-4 flex items-center">
        <input 
          type="number" 
          placeholder="Enter Product ID" 
          onChange={(e) => setProductId(Number(e.target.value))} 
          className="border p-2 w-40 text-center"
        />
        <button 
          onClick={() => refetch()} 
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Fetch
        </button>
      </div>

    
      {product && (
        <div className="mt-4 p-4 border shadow-lg rounded w-80 flex flex-col items-center">
          <img src={product.image} alt={product.title} className="w-40 h-40 object-contain mb-2" />
          <h2 className="text-lg font-bold text-center">{product.title}</h2>
          <p className="text-gray-500">${product.price}</p>
        </div>
      )}
    </div>
  );
};

export default GetProduct;
