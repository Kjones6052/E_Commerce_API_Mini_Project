// This file is for the Product Form component

// Form to add a Product to the database

// Import as needed
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { func, object } from 'prop-types';
import { Form, Button, Alert, Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';

// Create 'ProductForm' Function Based Component
const ProductForm = () => {

    // Constructing variables for component
    const [product, setProduct] = useState({ name: '', price: '', quantity: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Constructing Methods
    const validateForm = () => {
        let errors = {};
        if (!product.name) errors.name = 'Product name is required';
        if (!product.price || product.price <= 0) errors.price = 'Price must be a positive number';
        if (!product.quantity || product.quantity <= 0) errors.quantity = 'Quantity must be a positive number';
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        setSubmitting(true);
        try {
            console.log(product)
            await axios.post('http://127.0.0.1:5000/products', product)
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setProduct({ name: '', price: '' });
        setSubmitting(false);
        navigate('/products');
    };

    if (isSubmitting) return <p>Submitting product data...</p>;

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h3>Add Product</h3>
                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                <Form.Group constrolId="productName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type='text'
                        name='name'
                        value={product.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group constrolId="productPrice">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                        type='text'
                        name='price'
                        value={product.price}
                        onChange={handleChange}
                        isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.price}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group constrolId="productQuantity">
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control
                        type='number'
                        name='quantity'
                        value={product.quantity}
                        onChange={handleChange}
                        isInvalid={!!errors.quantity}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.quantity}
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
                <Modal.Body>Product has been successfully added!</Modal.Body>
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
ProductForm.propTypes = {
    selectedProduct: object,
    onProductUpdated: func
}

// Export
export default ProductForm;