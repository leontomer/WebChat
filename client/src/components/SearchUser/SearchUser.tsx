import React, { useState, useContext } from "react";
import {
  Form,
  InputGroup,
  Dropdown,
  DropdownButton,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { searchUser } from "../../actions/searchActions";
import { AppContext } from "../../context/AppContext";

const SearchUser: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const context = useContext(AppContext);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    if (event.target.value.length > 3) {
      const results = await searchUser(event.target.value);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
        <Col md={8} lg={11}>
          {" "}
          {/* Adjust width as needed */}
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search for users..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <DropdownButton
              align="end"
              variant="outline-secondary"
              title=""
              show={!!searchResults.length}
            >
              {searchResults.map((user, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => {
                    context?.setCurrentChatUser(user);
                    setSearchResults([]);
                  }}
                >
                  {user}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchUser;
