import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../hooks/useGetUserID";

const CreateProduct = () => {
  const [cookie, __] = useCookies(["access_token"]);

  const userId = useGetUserID();

  const [initialProductState, _] = useState({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: 0,
    productOwner: userId,
  });
  const [product, setProduct] = useState(initialProductState);

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/products/createProduct";
      await axios.post(
        url,
        { ...product },
        { headers: { authorization: `Bearer: ${cookie.access_token}` } }
      );
      setProduct(initialProductState);
      alert("Product created.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="text-center">
      {error && <h1 style={{ color: "red" }}>{error}</h1>}

      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Form
          style={{
            marginTop: "1rem",
            width: "500px",
            textAlign: "center",
          }}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={product.title}
              onChange={handleChange}
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              min={0}
              name="price"
              value={product.price}
              onChange={handleChange}
              type="number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="category"
              value={product.category}
              onChange={handleChange}
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              name="image"
              value={product.image}
              onChange={handleChange}
              type="text"
              alt={product.title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              name="rating"
              value={product.rating}
              onChange={handleChange}
              max={5}
              min={0}
              type="number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              value={product.description}
              onChange={handleChange}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Button className="mx-auto" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default CreateProduct;
