// This file is the code for the Home Page

// Import as needed
import {  useNavigate } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';

// Creating functional component to display Home Page
function HomePage() {
    const navigate = useNavigate();
    return (
        <div className="text-center">
            <h1>Welcome to Buy Stuff Co</h1>
            <p>
                Hello and welcome to Buy Stuff, where you can buy stuff! Please use the navigation bar above to navigate our application.

                Where To:
                 
            </p>
        </div>
        
    )
}

export default HomePage;