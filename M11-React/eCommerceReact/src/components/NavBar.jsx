// This file is the code for the Navigation Bar

// Import as needed
import {  NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

// Navbar.Brand, Navbar.Toggle, Navbar.Collapse, Nav.Link(do not use with react-router-dom Link)
function NavigationBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Buy Stuff Co</Navbar.Brand>
            <Navbar.Toggle area-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/" activeclassname="active">
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/new-customer" activeclassname="active">
                        New Customer
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/search-customer" activeclassname="active">
                        Search Customers
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/new-customer-account" activeclassname="active">
                        New Customer Account
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/search-customer-account" activeclassname="active">
                        Search Customer Accounts
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/products" activeclassname="active">
                        View Products
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/add-product" activeclassname="active">
                        Add Product
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

// Export
export default NavigationBar;