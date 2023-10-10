import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import CreateProduct from "./pages/createProduct/CreateProduct";
import Dashboard from "./pages/dashboard/Dashboard";
import NavBar from "./components/navbar/NavBar";
import { CartContext } from "./context/CartContext";

const App = () => {
  return (
    <>
      <NavBar />
      <CartContext>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </CartContext>
    </>
  );
};

export default App;
