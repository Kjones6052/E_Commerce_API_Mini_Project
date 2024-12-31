// This file is for the Update Customer Form component

// Form to update Customer Details: name, email, and phone

// Import as needed
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { func, object } from 'prop-types';
import { Form, Button, Alert, Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';

// Create 'UpdatedCustomerForm' Function Based Component
const UpdatedCustomerForm = () => {

    // Constructing variables for component
    const [customer, setCustomer] = useState({ id: '', name: '', email: '', phone: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    // Creat Methods
    useEffect(() => {
        if (id) { // if ID run code
            axios.get(`http://127.0.0.1:5000/customers/${id}`) // GET product data by id
                .then(response => {
                    setCustomer(response.data); // Assign data to variable
                }) 
                .catch (error => setErrorMessage(error.message));
        }
    }, [id]);

    const validateForm = () => {
        let errors = {};
        if (!customer.name) errors.name = 'Customer name is required';
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        setSubmitting(true);
        try {
            await axios.put(`http://127.0.0.1:5000/customers/${id}`, customer);
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomer(prevCustomer => ({
            ...prevCustomer,
            [name]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setCustomer({ name: '', email: '', phone: '' });
        setSubmitting(false);
        navigate(`/`);
    };

    if (isSubmitting) return <p>Submitting customer information...</p>;

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h3>Update Customer</h3>
                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                <Form.Group constrolId="customerName">
                    <Form.Label>Name:</Form.Label>
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
                    <Form.Label>Phone Number:</Form.Label>
                    <Form.Control
                        type='tel'
                        name='phone'
                        value={customer.phone}
                        onChange={handleChange}
                        isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.phone}
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
                <Modal.Body>Customer has been successfully updated!</Modal.Body>
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
UpdatedCustomerForm.propTypes = {
    selectedProduct: object,
    onProductUpdated: func
}

// Export
export default UpdatedCustomerForm;