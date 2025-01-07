// This file is for the Search Customer Account component

// Import as needed
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup, Row, Col } from 'react-bootstrap';

// Creating Function Based 'SearchCustomer' Component
const SearchCustomerAccount = () => {

    // Constructing Variables
    const [ customerAccounts, setCustomerAccounts ] = useState([]);
    const navigate = useNavigate();

    // Function to fetch Customer Accounts Data
    const fetchCustomerAccounts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/customer_accounts'); // GET customer accounts data 
            setCustomerAccounts(response.data); // assigning data to component variable
        } catch (error) {
            console.error('Error fetching customer accounts:', error); // catch and log errors
        } 
    };

    // Will run once
    useEffect(() => {
        fetchCustomerAccounts();
    }, []);

    // Return Output
    return (
        <Container>
            <Row>
                <Col>
                    <h3>Customer Accounts:</h3>
                    <ListGroup>
                        {customerAccounts.map((customerAccount) => {
                            return (
                            <ListGroup.Item key={customerAccount.id} className='d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
                                <strong>Customer Account ID:</strong> {customerAccount.id} <strong>User Name:</strong> {customerAccount.username}
                                <div>
                                    <Button variant='primary' onClick={() => navigate(`/view-customer-account/${customerAccount.id}`)} className='me-2'>View Customer Account Details</Button>
                                </div>
                            </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Col>
            </Row>
            <Button variant='primary' onClick={() => navigate('/new-customer-account')}>
                Add New Customer Account
            </Button>
        </Container>
    );
};

// Export
export default SearchCustomerAccount;