import { useCart } from "../../context/UseCartContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserRole } from "../../hooks/useGetUserRole";

const ProductItem = ({ item }) => {
  const [openDetails, setOpenDetails] = useState(false);
  const [cookie, _] = useCookies(["access_token"]);

  const userRole = useGetUserRole();

  const {
    getItemQuantity,
    addToCart,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useCart();

  const quantity = getItemQuantity(item._id);

  const getDetails = () => {
    setOpenDetails(!openDetails);
  };

  const removeItem = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/products/removeItem/${id}`,
        null,
        { headers: { authorization: `Bearer ${cookie.access_token}` } }
      );
      alert("Item removed.");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Card
      style={{
        display: "flex",
        backgroundColor: "lightGray",
        justifyContent: "center",
        alignItems: "center",
        height: "380px",
      }}
    >
      <Card.Img
        src={item.image}
        style={{
          marginTop: "0.1rem",
          width: "150px",
          height: "100px",
          objectFit: "cover",
        }}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title style={{ textAlign: "center" }}>{item.title}</Card.Title>
        <Card.Text style={{ textAlign: "center", margin: "0" }}>
          ${item.price}
        </Card.Text>
        {userRole === "admin" && (
          <Button onClick={() => removeItem(item._id)}>Delete</Button>
        )}
      </Card.Body>
      {quantity === 0 ? (
        <div
          key={item._id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button onClick={() => addToCart(item)}>Add to cart</Button>
          <Button className="mt-1" onClick={() => getDetails()}>
            Details
          </Button>
          {openDetails && (
            <Card.Text style={{ textAlign: "center" }}>
              {item.description}
            </Card.Text>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.1rem",
          }}
        >
          <Button onClick={() => decreaseCartQuantity(item._id)}>-</Button>
          {quantity}
          <Button onClick={() => increaseCartQuantity(item._id)}>+</Button>
          <Button onClick={() => removeFromCart(item._id)}>Remove</Button>
        </div>
      )}
    </Card>
  );
};

export default ProductItem;
