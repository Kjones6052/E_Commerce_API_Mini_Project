// This file is for the Search Customer component

// Import as needed
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup, Row, Col } from 'react-bootstrap';

// Creating Function Based 'SearchCustomer' Component
const SearchCustomer = () => {

    // Constructing Variables
    const [ customers, setCustomers ] = useState([]);
    const navigate = useNavigate();

    // Function to fetch Customers Data
    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/customers'); // GET customers data 
            setCustomers(response.data); // assigning data to component variable
        } catch (error) {
            console.error('Error fetching customers:', error); // catch and log errors
        } 
    };

    // Will run once
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Return Output
    return (
        <Container>
            <Row>
                <Col>
                    <h3>Customers:</h3>
                    <ListGroup>
                        {customers.map((customer) => {
                            return (
                            <ListGroup.Item key={customer.id} className='d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
                                <strong>Customer ID:</strong> {customer.id} <strong>Customer Name:</strong> {customer.name}
                                <div>
                                    <Button variant='primary' onClick={() => navigate(`/view-customer/${customer.id}`)} className='me-2'>View Customer Details</Button>
                                </div>
                            </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Col>
            </Row>
            <Button variant='primary' onClick={() => navigate('/new-customer')}>
                Add New Customer
            </Button>
        </Container>
    );
};

// Export
export default SearchCustomer;