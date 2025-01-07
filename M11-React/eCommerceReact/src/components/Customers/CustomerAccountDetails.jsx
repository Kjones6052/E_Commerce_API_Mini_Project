// This file is for the Customer Detail component

// Import as needed
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

// Creating functional component to display customer details based on ID
const CustomerAccountDetails = () => {
    const [customerAccount, setCustomerAccount] = useState({ id: '', username: '', password: '', customerId: '' });
    const [errorMessage, setErrorMessage] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    // Creating Methods

    // Get Customer Account info for Display
    useEffect(() => {
        if (id) { // if ID run code
            axios.get(`http://127.0.0.1:5000/customer_accounts/${id}`)
                .then(response => {
                    setCustomerAccount(response.data);
                }) 
                .catch (error => setErrorMessage(error.message));
        }
    }, [id]);

    // DELETE customer async function
    const deleteCustomerAccount = async (id) => {
        
        // try/catch to catch errors
        try {
            await axios.delete(`http://127.0.0.1:5000/customer_accounts/${id}`);
            navigate('/')
        } catch (error) {
            console.error('Error deleting customer account', error);
        }
    };

    // Return Display
    return (
        <div className='container'>
            {errorMessage && <div>Error: {errorMessage}</div>}
            <h3>Customer Account Details</h3>
            <h5>{customerAccount.username}</h5>
            <p><strong>Password: </strong>{customerAccount.password}</p>
            <p><strong>Customer ID: </strong>{customerAccount.customerId}</p>
            <Button variant='primary' onClick={() => navigate(`/edit-customer/${customerAccount.id}`)} className='me-2'>Edit Customer Account</Button>
            <Button variant='primary' onClick={() => deleteCustomerAccount(customerAccount.id)} className='me-2'>Delete Customer Account</Button>
        </div>
    )
}

// Export
export default CustomerAccountDetails;