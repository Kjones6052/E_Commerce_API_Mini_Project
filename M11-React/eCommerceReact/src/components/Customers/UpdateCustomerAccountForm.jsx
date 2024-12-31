// This file is for the Update Customer Account Form component

// Form to update Customer Account Details: username and email

// Import as needed
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { func, object } from 'prop-types';
import { Form, Button, Alert, Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';

// Create 'UpdatedCustomerForm' Function Based Component
const UpdatedCustomerAccountForm = () => {

    // Constructing variables for component
    const [customerAccount, setCustomerAccount] = useState({ id: '', username: '', email: '', password: '', customerId: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    // Creat Methods
    useEffect(() => {
        if (id) { // if ID run code
            axios.get(`http://127.0.0.1:5000/customer_accounts/${id}`) // GET product data by id
                .then(response => {
                    setCustomerAccount(response.data); // Assign data to variable
                }) 
                .catch (error => setErrorMessage(error.message));
        }
    }, [id]);

    const validateForm = () => {
        let errors = {};
        if (!customerAccount.username) errors.name = 'Customer account username is required';
        if (!customerAccount.email) errors.email = 'Customer account email is required';
        if (!customerAccount.password) errors.password = 'Customer account password is required';
        if (!customerAccount.customerId) errors.customerId = 'Customer ID is required';
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        setSubmitting(true);
        try {
            await axios.put(`http://127.0.0.1:5000/customer_accounts/${id}`, customerAccount);
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomerAccount(prevCustomerAccount => ({
            ...prevCustomerAccount,
            [name]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setCustomerAccount({ id: '', username: '', email: '', password: '', customerId: '' });
        setSubmitting(false);
        navigate(`/`);
    };

    if (isSubmitting) return <p>Submitting customer account information...</p>;

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h3>Update Customer Account</h3>
                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                <Form.Group constrolId="customerName">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type='text'
                        name='name'
                        value={customer.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group constrolId="customerEmail">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                        type='text'
                        name='email'
                        value={customer.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group constrolId="customerPhone">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type='password'
                        name='password'
                        value={customer.phone}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group constrolId="customerPhone">
                    <Form.Label>Customer ID:</Form.Label>
                    <Form.Control
                        type='number'
                        name='customerId'
                        value={customer.phone}
                        onChange={handleChange}
                        isInvalid={!!errors.customerId}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.customerId}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant='primary' type='submit' disabled={isSubmitting}>
                    {isSubmitting ? <Spinner as="span" animation='border' size='sm' /> : 'Submit'}
                </Button>
            </Form>
            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Customer account has been successfully updated!</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

// Validate Property Types
UpdatedCustomerAccountForm.propTypes = {
    selectedProduct: object,
    onProductUpdated: func
}

// Export
export default UpdatedCustomerAccountForm;