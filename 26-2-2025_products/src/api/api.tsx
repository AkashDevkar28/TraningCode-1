import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

// Fetch all products
export const fetchProducts = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

// Fetch a single product by ID
export const fetchProductById = async (id: number) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

// Add a new product
export const addProduct = async (newProduct: any) => {
  const { data } = await axios.post(API_URL, newProduct);
  return data;
};

// Update a product
export const updateProduct = async ({ id, updatedProduct }: any) => {
  const { data } = await axios.put(`${API_URL}/${id}`, updatedProduct);
  return data;
};

// Delete a product
export const deleteProduct = async (id: number) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
