// This file is the code for the Home Page

// Import as needed
import {  useNavigate } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';

// Creating functional component to display Home Page
function HomePage() {
    const navigate = useNavigate();
    return (
        <div className="text-center">
            <h1>Welcome to Buy Stuff</h1>
            <p>Please use the menu below or the navigation bar above.</p>
            <Row>
                <Col>
                    <Button variant='primary' onClick={() => navigate('/sign-up')}>
                        User Sign Up
                    </Button>
                    <p>New user? Sign up for a new user account here!</p>
                </Col>
                <Col>
                    <Button variant='primary' onClick={() => navigate('/products')}>
                        View Product Catalog
                    </Button>
                    <p>View the complete product catalog.</p>
                </Col>
            </Row>
        </div>
        
    )
}

export default HomePage;