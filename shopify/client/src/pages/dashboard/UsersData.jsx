import axios from "axios";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/esm/Container";

const UsersData = ({ role }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "http://localhost:5000/auth/getUsersDocuments";
    const fetchUsersDocuments = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchUsersDocuments();
  }, [role]);

  return (
    <Container>
      {error && <h1>{error.message}</h1>}
      {data && (
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>id</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row._id}>
                <td>{row._id}</td>
                <td>{row.username}</td>
                <td>{row.email}</td>
                <td>{row.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UsersData;
