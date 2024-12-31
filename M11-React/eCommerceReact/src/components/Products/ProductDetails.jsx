// This file is for the Product Details component, including a function to Delete and Edit Product

// Display all Product Details based on ID: name, price, quantity
// Button to delete product from database
// Button to edit product

// Import as needed
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

// Creating functional component to display product details based on ID
const ProductDetails = () => {
    const [product, setProduct] = useState({ name: '', price: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    // Creating Methods

    // Get Product Data for Display
    useEffect(() => {
        if (id) { // if ID run code
            axios.get(`http://127.0.0.1:5000/products/${id}`) // GET product data by id
                .then(response => {
                    setProduct(response.data); // Assign data to variable
                }) 
                .catch (error => setErrorMessage(error.message));
        }
    }, [id]);

    // DELETE product async function
    const deleteProduct = async (id) => {
        
        // try/catch to catch errors
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${id}`); // DELETE request to remove product according to 'id'
            navigate('/products')
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    // Return Display
    return (
        <div className='container'>
            <h3>Product Details</h3>
            <h5>{product.name}</h5>
            <img src="" alt={product.name} />
            <p><strong>Price: $</strong>{product.price}</p>
            <Button variant='primary' onClick={() => navigate(`/order/${product.id}`)} className='me-2'>Order Product</Button>
            <Button variant='primary' onClick={() => navigate(`/edit-product/${product.id}`)} className='me-2'>Edit Product</Button>
            <Button variant='primary' onClick={() => deleteProduct(product.id)} className='me-2'>Delete Product</Button>
        </div>
    )
}

// Export
export default ProductDetails;