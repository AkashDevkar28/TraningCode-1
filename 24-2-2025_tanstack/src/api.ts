import axios from "axios";

const API_URL = "https://fakestoreapi.com";

export const fetchProducts = async () => {
  const { data } = await axios.get(`${API_URL}/products`);
  return data;
};

export const fetchProductById = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/products/${id}`);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await axios.get(`${API_URL}/products/categories`);
  return data;
};

export const fetchProductsByCategory = async (category: string) => {
  const { data } = await axios.get(`${API_URL}/products/category/${category}`);
  return data;
};
