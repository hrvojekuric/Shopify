import { useState } from "react";
import { Button, FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState(null);

  const navigate = useNavigate();

  const saveUserData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
      window.alert("Registration successfull.");
      navigate("/signin");
    } catch (error) {
      if (error.response?.data?.message) {
        setShowError(error.response.data.message);
      } else {
        setShowError("Username, email, and password are required.");
      }
    }
  };

  return (
    <main className="vh-100 container d-flex flex-column justify-content-center align-items-center gap-4">
      {showError && <section style={{ color: "red" }}>{showError}</section>}
      <Form
        onSubmit={registerUser}
        className="d-flex flex-column col-lg-4 col-md-7 col-sm-7 "
      >
        <FloatingLabel
          className="p-1"
          controlId="floatingUsername"
          label="Username *"
        >
          <Form.Control
            name="username"
            className="p-1"
            type="text"
            placeholder="Username *"
            minLength={1}
            maxLength={15}
            autoComplete="true"
            onChange={saveUserData}
          />
        </FloatingLabel>
        <FloatingLabel
          className="p-1"
          controlId="floatingEmail"
          label="Email *"
        >
          <Form.Control
            name="email"
            type="email"
            placeholder="Email *"
            autoComplete="true"
            onChange={saveUserData}
          />
        </FloatingLabel>
        <FloatingLabel
          className="p-1"
          controlId="floatingPassword"
          label="Password *"
        >
          <Form.Control
            name="password"
            type="password"
            placeholder="Password *"
            minLength={8}
            autoComplete="true"
            onChange={saveUserData}
          />
        </FloatingLabel>
        <Button type="submit">SIGN UP</Button>
      </Form>
      <h6>
        Already have an account? <Link to="/signin">Sign in</Link>
      </h6>
    </main>
  );
};

export default SignUp;
