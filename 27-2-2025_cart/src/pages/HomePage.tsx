import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/api";
import { useCart } from "../context/CartContext"; 

const HomePage: React.FC = () => {
  const { data: products, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { addToCart } = useCart();
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [category, setCategory] = useState<string>("");

  const categories = products ? [...new Set(products.map((p: any) => p.category))] : [];

  const filteredProducts = products
    ?.filter((p: any) => (category ? p.category === category : true))
    .sort((a: any, b: any) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error fetching products</div>;

  return (
    <div className="p-6 ml-64">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="mb-4 flex gap-4">
        <select
          className="border p-2 rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        <select className="border p-2 rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat as string} value={cat as string}>{cat as string}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filteredProducts?.map((product: any) => (
          <div key={product.id} className="bg-white p-4 shadow rounded">
            <img src={product.image} alt={product.title} className="w-full h-40 object-contain mb-2" />
            <h2 className="text-lg font-bold text-black">{product.title}</h2>

            <p className="text-gray-500">${product.price}</p>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
