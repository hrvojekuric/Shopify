import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCart } from "../../context/UseCartContext";

const CartItems = ({ item }) => {
  const [openDetails, setOpenDetails] = useState(false);

  const itemPrice = item.price * item.quantity;

  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
    useCart();

  const getDetails = () => {
    setOpenDetails(!openDetails);
  };

  return (
    <Card
      style={{
        backgroundColor: "lightGray",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card.Img
        src={item.image}
        style={{
          marginTop: "1rem",
          height: "5rem",
          maxWidth: "200px",
          display: "flex",
        }}
        alt={item.title}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title style={{ textAlign: "center" }}>{item.title}</Card.Title>
        <Card.Text style={{ textAlign: "center" }}>${itemPrice}</Card.Text>
        <Card.Text style={{ textAlign: "center" }}>{item.category}</Card.Text>
      </Card.Body>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.1rem",
          marginBottom: "1rem",
        }}
      >
        <Button onClick={() => decreaseCartQuantity(item._id)}>-</Button>
        {item.quantity}
        <Button onClick={() => increaseCartQuantity(item._id)}>+</Button>
        <Button onClick={() => removeFromCart(item._id)}>Remove</Button>
        <Button
          style={{ marginBottom: "1rem" }}
          onClick={() => getDetails(item._id)}
        >
          Details
        </Button>
        {openDetails && (
          <Card.Text style={{ textAlign: "center", marginBottom: "1rem" }}>
            {item.description}
          </Card.Text>
        )}
      </div>
    </Card>
  );
};

export default CartItems;
