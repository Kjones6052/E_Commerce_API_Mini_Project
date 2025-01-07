// This file is for the Customer Detail component

// Import as needed
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

// Creating functional component to display customer details based on ID
const CustomerDetails = () => {
    const [customer, setCustomer] = useState({ id: '', name: '', email: '', phone: '' });
    const [errorMessage, setErrorMessage] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    // Creating Methods

    // Get Customer for Display
    useEffect(() => {
        if (id) { // if ID run code
            axios.get(`http://127.0.0.1:5000/customers/${id}`)
                .then(response => {
                    setCustomer(response.data);
                }) 
                .catch (error => setErrorMessage(error.message));
        }
    }, [id]);

    // DELETE customer async function
    const deleteCustomer = async (id) => {
        
        // try/catch to catch errors
        try {
            await axios.delete(`http://127.0.0.1:5000/customers/${id}`);
            navigate('/')
        } catch (error) {
            console.error('Error deleting customer', error);
        }
    };

    // Return Display
    return (
        <div className='container'>
            {errorMessage && <div>Error: {errorMessage}</div>}
            <h3>Customer Details</h3>
            <h5>{customer.name}</h5>
            <p><strong>Email: </strong>{customer.email}</p>
            <p><strong>Phone: </strong>{customer.phone}</p>
            <Button variant='primary' onClick={() => navigate(`/edit-customer/${customer.id}`)} className='me-2'>Edit Customer</Button>
            <Button variant='primary' onClick={() => deleteCustomer(customer.id)} className='me-2'>Delete Customer</Button>
        </div>
    )
}

// Export
export default CustomerDetails;