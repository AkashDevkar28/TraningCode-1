import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchProducts, updateProduct } from "../api/api";

const UpdateProduct: React.FC = () => {
  const { data: products, isLoading, error } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      alert("Product updated successfully!");
      setSelectedProduct(null); 
    },
  });

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    price: "",
    category: "",
    image: "",
  });


  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setFormData({
      id: product.id,
      title: product.title,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
    });
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      id: formData.id,
      updatedProduct: {
        title: formData.title,
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.image,
      },
    });
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error fetching products</div>;

  return (
    <div className="p-6 ml-64">
      <h1 className="text-2xl font-bold mb-4">Update Product</h1>

   
      <div className="grid grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div key={product.id} className="bg-white p-4 shadow rounded">
            <img src={product.image} alt={product.title} className="w-full h-40 object-contain mb-2" />
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-gray-500">${product.price}</p>
            <button onClick={() => handleEditClick(product)} className="mt-2 bg-yellow-500 text-white px-4 py-1 rounded">
              Update
            </button>
          </div>
        ))}
      </div>

     
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-lg rounded w-96">
            <h2 className="text-xl font-bold mb-4">Update Product</h2>
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="id" value={formData.id} />

              <div className="mb-4">
                <label className="block text-sm font-semibold">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="border p-2 w-full rounded" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Price ($)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required className="border p-2 w-full rounded" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} required className="border p-2 w-full rounded" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Image URL</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} required className="border p-2 w-full rounded" />
              </div>

              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  {mutation.isPending ? "Updating..." : "Update"}
                </button>
                <button type="button" onClick={() => setSelectedProduct(null)} className="bg-gray-400 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
