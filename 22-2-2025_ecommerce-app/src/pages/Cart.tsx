import React from "react";
import { useStore } from "../context/StoreContext";
import { Container, Table, Button, Alert } from "react-bootstrap";

const Cart: React.FC = () => {
  const { state, dispatch } = useStore();

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Shopping Cart</h1>
      {state.cart.length === 0 ? (
        <Alert variant="info" className="text-center">Your cart is empty</Alert>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state.cart.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <Button variant="danger" onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Cart;
