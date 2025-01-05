// This file is the code for the Navigation Bar

// Import as needed
import {  NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

// Navbar.Brand, Navbar.Toggle, Navbar.Collapse, Nav.Link(do not use with react-router-dom Link)
function NavigationBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">BuyStuff.com</Navbar.Brand>
            <Navbar.Toggle area-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/" activeclassname="active">
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/sign-up" activeclassname="active">
                        Sign Up
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/login" activeclassname="active">
                        Log In
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/products" activeclassname="active">
                        View Products
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/order/:id" activeclassname="active">
                        Place Order
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

// Export
export default NavigationBar;