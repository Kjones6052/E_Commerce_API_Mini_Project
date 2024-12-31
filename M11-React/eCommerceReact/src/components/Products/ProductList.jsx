// This file is for the Product List component

// Display list of all available products in the database: name, price, button to view details

/*
    Product Model:
    ID: primary/auto
    Name: required
    Price: required
    Orders: relationship order / orderDetails -> products
*/

// Import as needed
import axios from 'axios';
import { array, func } from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup, Row, Col } from 'react-bootstrap';

// Creating Function Based 'ProductList' Component
const ProductList = () => {

    // Constructing Variables
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Function to fetch Product Data
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/products'); // GET products data 
            setProducts(response.data); // assigning data to component variable
        } catch (error) {
            console.error('Error fetching products:', error); // catch and log errors
        }
    };

    // Will run once
    useEffect(() => {
        fetchProducts();
    }, []);

    // Return Output
    return (
        <Container>
            <Row>
                <Col>
                    <h3>Products</h3>
                    <ListGroup>
                        {products.map(product => {
                            <ListGroup.Item key={product.id} className='d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
                                {product.name} (Price: {product.price})
                                <div>
                                    <Button variant='primary' onClick={() => navigate(`/view-product/${product.id}`)} className='me-2'>View Product Details</Button>
                                </div>
                            </ListGroup.Item>
                        })}
                    </ListGroup>
                </Col>
            </Row>
            <Button variant='primary' onClick={() => navigate('/add-product')}>
                Add New Product
            </Button>
        </Container>
    );
};

// Validating Property Types
ProductList.propTypes = {
    products: array,
    onEditProducts: func,
    onProductDeleted: func
}

// Export
export default ProductList;