import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchProducts, deleteProduct } from "../api/api";

const DeleteProduct: React.FC = () => {
  const { data: products, isLoading, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      alert("Product deleted successfully!");
      refetch();
    },
  });

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error fetching products</div>;

  return (
    <div className="p-6 ml-64">
      <h1 className="text-2xl font-bold mb-4">Delete Product</h1>

      {/* Product List */}
      <div className="grid grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div key={product.id} className="bg-white p-4 shadow rounded">
            <img src={product.image} alt={product.title} className="w-full h-40 object-contain mb-2" />
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-gray-500">${product.price}</p>
            <button
              onClick={() => mutation.mutate(product.id)}
              className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
            >
              {mutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteProduct;
