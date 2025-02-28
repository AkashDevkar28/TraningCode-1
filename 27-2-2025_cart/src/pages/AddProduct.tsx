import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "../api/api";

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      alert("Product added successfully!");
      setFormData({ title: "", price: "", category: "", image: "" }); 
      setErrors({ title: "", price: "", category: "", image: "" }); 
    },
  });

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });


    if (e.target.name === "title" && e.target.value.trim() === "") {
      setErrors({ ...errors, title: "Title is required" });
    } else if (e.target.name === "price" && (Number(e.target.value) <= 0 || e.target.value === "")) {
      setErrors({ ...errors, price: "Enter a valid price" });
    } else if (e.target.name === "category" && e.target.value.trim() === "") {
      setErrors({ ...errors, category: "Category is required" });
    } else if (e.target.name === "image" && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(e.target.value)) {
      setErrors({ ...errors, image: "Enter a valid image URL (jpg, png, gif, webp)" });
    } else {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

   
    if (!formData.title || !formData.price || !formData.category || !formData.image) {
      alert("Please fill in all fields correctly before submitting.");
      return;
    }

    mutation.mutate({
      title: formData.title,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image,
    });
  };

  return (
    <div className="p-6 ml-64">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

  
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded w-96">
        <div className="mb-4">
          <label className="block text-sm font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
            required
            className="border p-2 w-full rounded"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
            className="border p-2 w-full rounded"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter product category"
            required
            className="border p-2 w-full rounded"
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL (jpg, png, gif, webp)"
            required
            className="border p-2 w-full rounded"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
