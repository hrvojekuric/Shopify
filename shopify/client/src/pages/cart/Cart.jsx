import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";

import { useCart } from "../../context/UseCartContext";
import CartItems from "./CartItems";

function Cart() {
  const { cartItems } = useCart();

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {cartItems.map((item) =>
          item.quantity !== 0 ? (
            <Col
              style={{
                marginTop: "1rem",
                minWidth: "200px",
                maxWidth: "200px",
              }}
              key={item._id}
            >
              <CartItems item={item} />
            </Col>
          ) : null
        )}
      </Row>
    </Container>
  );
}

export default Cart;
