import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { FloatingLabel } from "react-bootstrap";

const ChangeRole = ({ role, setRole }) => {
  const [grantId, setGrantId] = useState("");
  const [error, setError] = useState(null);
  const [cookie, _] = useCookies(["access_token"]);

  const changeRole = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/auth/grant-admin/${grantId}`,
        null,
        {
          headers: { authorization: `Bearer ${cookie.access_token} ` },
        }
      );
      setRole(!role);
      setGrantId("");
      alert("Role is changed.");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <Form onSubmit={changeRole} className="">
        <FloatingLabel
          className="p-1"
          controlId="floatingUsername"
          label="Enter user id"
        >
          <Form.Control
            style={{ maxWidth: "300px" }}
            value={grantId}
            onChange={(e) => setGrantId(e.target.value)}
            name="username"
            className="p-1"
            type="text"
            placeholder="Enter user id"
            autoComplete="true"
          />
        </FloatingLabel>
        <Button type="submit">Change role</Button>
      </Form>
    </>
  );
};

export default ChangeRole;
