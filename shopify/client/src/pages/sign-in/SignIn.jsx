import { FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const SignIn = () => {
  const [_, setCookies] = useCookies(["access_token"]);

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [showError, setShowError] = useState(null);

  const navigate = useNavigate();

  const validateForm = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username: userData.username,
        password: userData.password,
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      window.localStorage.setItem("userRole", response.data.role);
      window.alert("You are logged in.");
      navigate("/");
    } catch (error) {
      if (error.response?.data?.message) {
        setShowError(error.response.data.message);
      } else {
        setShowError("Something went wrong.Try again later");
      }
    }
  };

  return (
    <main className="vh-100 container d-flex flex-column justify-content-center align-items-center gap-4">
      {showError && <p style={{ color: "red" }}>{showError}</p>}
      <Form
        onSubmit={validateUser}
        className="d-flex flex-column col-lg-4 col-md-7 col-sm-7 "
      >
        <FloatingLabel
          className="p-1"
          controlId="floatingUsername"
          label="Username *"
        >
          <Form.Control
            name="username"
            onChange={validateForm}
            className="p-1"
            type="text"
            placeholder="Username *"
            minLength={1}
            maxLength={15}
            autoComplete="true"
          />
        </FloatingLabel>
        <FloatingLabel
          className="p-1"
          controlId="floatingPassword"
          label="Password *"
        >
          <Form.Control
            name="password"
            onChange={validateForm}
            type="password"
            placeholder="Password *"
            minLength={8}
          />
        </FloatingLabel>
        <Button type="submit">SIGN UP</Button>
      </Form>
      <h6>
        Don't have and account?<Link to="/signup"> Sign up</Link>{" "}
      </h6>
    </main>
  );
};

export default SignIn;
