import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { Container, Form, Button, Table } from "react-bootstrap";

const Admin: React.FC = () => {
  const { state, dispatch } = useStore();
  const [newProduct, setNewProduct] = useState({ id: 0, title: "", price: 0, category: "", image: "" });
  const [editMode, setEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  // Handle adding a new product
  const addProduct = () => {
    if (newProduct.title && newProduct.price > 0) {
      dispatch({ type: "ADD_PRODUCT", payload: { ...newProduct, id: Date.now() } });
      resetForm();
    }
  };

  // Handle editing a product
  const editProduct = (productId: number) => {
    const productToEdit = state.products.find((product) => product.id === productId);
    if (productToEdit) {
      setNewProduct(productToEdit);
      setEditMode(true);
      setEditingProductId(productId);
    }
  };

  // Handle saving an edited product
  const saveProduct = () => {
    if (editingProductId !== null) {
      dispatch({ type: "EDIT_PRODUCT", payload: { ...newProduct, id: editingProductId } });
      resetForm();
    }
  };

  // Reset form
  const resetForm = () => {
    setNewProduct({ id: 0, title: "", price: 0, category: "", image: "" });
    setEditMode(false);
    setEditingProductId(null);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">{editMode ? "Edit Product" : "Admin Panel - Add Product"}</h1>
      
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product title"
            value={newProduct.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProduct({ ...newProduct, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={newProduct.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProduct({ ...newProduct, price: +e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={newProduct.category}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={newProduct.image}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
        </Form.Group>

        <Button variant={editMode ? "warning" : "success"} className="w-100" onClick={editMode ? saveProduct : addProduct}>
          {editMode ? "Save Changes" : "Add Product"}
        </Button>
      </Form>

      <h2 className="text-center mt-5">Product List</h2>
      <Table striped bordered hover responsive className="shadow-sm mt-3">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.products.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.category}</td>
              <td><img src={product.image} alt={product.title} style={{ width: "50px", height: "50px" }} /></td>
              <td>
                <Button variant="info" size="sm" className="me-2" onClick={() => editProduct(product.id)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => dispatch({ type: "DELETE_PRODUCT", payload: product.id })}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Admin;
