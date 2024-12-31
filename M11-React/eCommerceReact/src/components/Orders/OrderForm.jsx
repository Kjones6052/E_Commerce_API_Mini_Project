// This file is for the Order Form component

// Import as needed
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { func, object } from 'prop-types';
import { Form, Button, Alert, Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';

// Create 'OrderForm' Function Based Component
const OrderForm = () => {

    // Constructing variables for component
    const [product, setProduct] = useState({ id: '', name: '', price: '', status: '' });
    const [order, setOrder] = useState({ date: '', customerId: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const date = new Date();
    const status = useState('Complete')

    // Wil run as lost as 'ID' is given
    useEffect(() => {
        if (id) { // if ID run code
            axios.get(`http://127.0.0.1:5000/products/${id}`)
                .then(response => {
                    setProduct(response.data);
                }) 
                .catch (error => setErrorMessage(error.message));
        }
    }, [id]);

    const validateForm = () => {
        let errors = {};
        if (!product.name) errors.name = 'Product name is required';
        if (!product.price || product.price <= 0) errors.price = 'Price must be a positive number';
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        order.date = date
        order.status = status
        if (!validateForm()) return;
        setSubmitting(true);
        try {
            await axios.post('http://127.0.0.1:5000/orders', order)
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrder(prevOrder => ({
            ...prevOrder,
            [name]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setOrder({ date: '', customerId: '' });
        setSubmitting(false);
        navigate('/');
    };

    if (isSubmitting) return <p>Submitting order...</p>;

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h3>Order Processing</h3>
                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                <p>
                    <strong>Product:</strong> {product.name}
                    <strong>Total:</strong> {product.price}
                    {date}
                </p>
                <Form.Group constrolId="productName">
                    <Form.Label>Customer ID:</Form.Label>
                    <Form.Control
                        type='number'
                        name='customerId'
                        value={order.customerId}
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
                <Modal.Body>Order has been successfully placed!</Modal.Body>
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
OrderForm.propTypes = {
    selectedProduct: object,
    onProductUpdated: func
}

// Export
export default OrderForm;