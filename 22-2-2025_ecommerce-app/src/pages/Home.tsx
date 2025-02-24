import React from "react";
import { useStore } from "../context/StoreContext";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const Home: React.FC = () => {
  const { state } = useStore();

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Products</h1>
      <Row>
        {state.products.map(product => (
          <Col key={product.id} md={4} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img variant="top" src={product.image} style={{ height: "200px", objectFit: "contain" }} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price.toFixed(2)}</Card.Text>
                <Link to={`/product/${product.id}`} className="btn btn-primary w-100">
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
