import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

interface SearchFormProps {
    onSearchSubmit: (term: string) => void;
    onClear: () => void;
  }
const SearchForm: React.FC<SearchFormProps> = ({ onSearchSubmit, onClear }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
      };
    
      const handleClick = () => {
        onSearchSubmit(searchTerm);
        setSearchTerm('');
      };

      const handleClear = () => {
        onClear();
    };
  
    return (
      <Navbar className="justify-content-between ms-5 d-flex align-items-center">
      <Form className="d-flex align-items-center">
        <Row className="g-2 align-items-center">
          <Col xs="auto" className='search'>
            <Form.Control
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={searchTerm}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs="auto">
            <Button className='clearSubmit' onClick={handleClick} type="button">Submit</Button>
          </Col>
          <Col xs="auto">
            <Button className='clear' onClick={handleClear} type="button">Clear</Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}

export default SearchForm;
