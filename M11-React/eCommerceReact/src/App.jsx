// This file is the code for the main App

// Import as needed
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import CustomerForm from "./components/Customers/CustomerForm";
import UpdateCustomerForm from "./components/Customers/UpdateCustomerForm";
import CustomerDetails from "./components/Customers/CustomerDetails";
import ProductList from "./components/Products/ProductList";
import ProductForm from "./components/Products/ProductForm";
import UpdateProductForm from "./components/Products/UpdateProductForm";
import OrderForm from "./components/Orders/OrderForm";
import NotFound from "./components/NotFound";
// import './AppStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import ProductDetails from "./components/Products/ProductDetails";

// App Function
function App() {
    return (
        <div className="app-container">
            <NavBar />
            <Routes> 
                <Route path="/" element={<HomePage />} />
                <Route path="/sign-up" element={<CustomerForm />} />
                <Route path="/login" element={<CustomerForm />} />
                <Route path="/edit-customer/:id" element={<UpdateCustomerForm />} />
                <Route path="/customer-details/:id" element={<CustomerDetails />} />
                <Route path="/order/:id" element={<OrderForm />} />
                <Route path="/add-product" element={<ProductForm />} />
                <Route path="/edit-product/:id" element={<UpdateProductForm />} />
                <Route path="/view-product/:id" element={<ProductDetails />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

// Export
export default App;
