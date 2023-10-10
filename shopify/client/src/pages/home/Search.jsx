import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

const Search = ({
  searchValue,
  setSearchValue,
  handlePageChange,
  currentPage,
  indexOfLastItem,
  filteredItems,
}) => {
  return (
    <Container className="d-flex flex-column align-items-center col-lg-4 col-md-5 col-sm-7 gap-3">
      <Form className="mt-3 d-flex  flex-column  ">
        <Form.Group controlId="searchProducts">
          <Form.Control
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by name"
            type="search"
            alt="search"
          />
        </Form.Group>
      </Form>
      <Button
        variant="secondary"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </Button>
      <h6 style={{ margin: "0" }}>{currentPage}</h6>
      <Button
        variant="secondary"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={indexOfLastItem >= filteredItems.length}
      >
        Next
      </Button>
    </Container>
  );
};

export default Search;
