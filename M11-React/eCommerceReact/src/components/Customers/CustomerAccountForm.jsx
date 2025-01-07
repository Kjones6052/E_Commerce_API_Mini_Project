// This file is for the Update Customer Account Form component

// Import as needed
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';

// Create 'CustomerAccountForm' Function Based Component
const CustomerAccountForm = () => {

    // Constructing variables for component
    const [customerAccount, setCustomerAccount] = useState({ username: '', password: '', customerId: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let errors = {};
        if (!customerAccount.username) errors.name = 'Customer account username is required';
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
            await axios.post(`http://127.0.0.1:5000/customer_accounts/`, customerAccount);
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
        setCustomerAccount({ username: '', password: '', customerId: '' });
        setSubmitting(false);
        navigate(`/`);
    };

    if (isSubmitting) return <p>Submitting customer account information...</p>;

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h3>New Customer Account</h3>
                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type='text'
                        name='username'
                        value={customerAccount.username}
                        onChange={handleChange}
                        isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.username}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type='password'
                        name='password'
                        value={customerAccount.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Customer ID:</Form.Label>
                    <Form.Control
                        type='number'
                        name='customerId'
                        value={customerAccount.customerId}
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
                <Modal.Body>Customer account has been successfully created!</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

// Export
export default CustomerAccountForm;