import axios from "axios";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Search from "./Search";

const Home = () => {
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fakeStoreApi = "http://localhost:5000/products/getProducts";

    const fetchData = async () => {
      try {
        const response = await axios.get(fakeStoreApi);
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredItems = items.filter((item) => {
    if (searchValue.toLowerCase() === "") {
      return true;
    }
    return item.title.toLowerCase().includes(searchValue);
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        indexOfLastItem={indexOfLastItem}
        filteredItems={filteredItems}
      />
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <h1 style={{ textAlign: "center", marginTop: "1rem" }}>Loading...</h1>
        ) : error ? (
          <h1 style={{ textAlign: "center", marginTop: "1rem" }}>
            Error: {error.message}
          </h1>
        ) : (
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {currentItems.map((item) => (
              <Col
                key={item._id}
                style={{
                  marginTop: "1rem",
                  minWidth: "200px",
                  maxWidth: "200px",
                }}
              >
                <ProductItem item={item} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Container>
  );
};

export default Home;
