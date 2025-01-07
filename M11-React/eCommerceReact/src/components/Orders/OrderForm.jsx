// This file is for the Order Form component

// Import as needed
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';

// Create 'OrderForm' Function Based Component
const OrderForm = () => {

    // Constructing variables for component
    const [product, setProduct] = useState({ id: '', name: '', price: '', quantity: '' });
    const [order, setOrder] = useState({ date: '', customer_id: '', status: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];

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
        if (!order.customer_id) errors.customer_id = 'Customer ID is required';
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        order.date = formattedDate
        order.status = 'Complete'
        if (!validateForm()) return;
        setSubmitting(true);
        try {
            await axios.post('http://127.0.0.1:5000/orders', order)
            setShowSuccessModal(true);
        } catch (error) {
            console.error(error)
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
        setOrder({ customer_id: '' });
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
                    <strong>Product: </strong>{product.name}<br/>
                    <strong>Total: $</strong>{product.price}<br/>
                    <strong>Date of Sale: </strong>{formattedDate}
                </p>
                <Form.Group>
                    <Form.Label>Customer ID:</Form.Label>
                    <Form.Control
                        type='number'
                        name='customer_id'
                        value={order.customer_id}
                        onChange={handleChange}
                        isInvalid={!!errors.customer_id}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.customer_id}
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

// Export
export default OrderForm;