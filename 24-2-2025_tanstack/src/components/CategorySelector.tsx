import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api";

const CategorySelector = () => {
  const { data: categories } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category) {
      navigate(`/category/${category}`); 
    }
  };

  return (
    <div className="mb-4 text-center">
      <select value={selectedCategory} onChange={handleCategoryChange} className="form-select w-50 mx-auto">
        <option value="">Select a category</option>
        {categories?.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;
