# This file contains the main code for the application

# Import
from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from marshmallow import ValidationError
from models import Customer, CustomerAccount, Order,  Product, app, db
from schemas import customer_schema, customer_account_schema, order_schema, product_schema, products_schema



# Customer Routes and Methods (id, name, email, and phone number)

# Create New Customer Route and Method
@app.route('/customers', methods=['POST']) # Route to add new customer
def add_customer(): # Method to add new customer
    try:
        customer_data = customer_schema.load(request.json) # Validate and deserialize input
    except ValidationError as err: # Error handling
        return jsonify(err.messages), 400 # Jsonify error with type indicator
    
    try: # Adding customer info into a variable for query execution
        new_customer = Customer(name=customer_data['name'], email=customer_data['email'], phone=customer_data['phone'])
        db.session.add(new_customer) # Execute query to add new customer
        db.session.commit() # Commit changes to the database
        return jsonify({"message": "New Customer added successfully."}), 201 # Display message to user with type indicator
    except SQLAlchemyError as e: # Handle database-related errors
        db.session.rollback()  # Rollback the session to maintain consistency
        return jsonify({"error": str(e)}), 500
    except Exception as e: # Catch any other unexpected errors
        return jsonify({"error": str(e)}), 500

# Get Customer Route and Method
@app.route('/customers/<int:id>', methods=['GET']) # Route to get customer
def get_customer(id): # Method to get customer
    customer = Customer.query.get_or_404(id) # Retrieve customer by customer ID or produce 404 if not found
    return customer_schema.jsonify(customer)

# Update Customer Route and Method
@app.route('/customers/<int:id>', methods=['PUT']) # Route to UPDATE customer
def update_customer(id): # Method to update customer
    customer = Customer.query.get_or_404(id) # Retrieve customer by customer ID or produce 404 if not found
    try:
        customer_data = customer_schema.load(request.json) # Get customer data
    except ValidationError as err: # Error handling
        return jsonify(err.messages), 400 # Display error message to user with type indicator
    
    try: # Updating customer data
        customer.name = customer_data['name']
        customer.email = customer_data['email']
        customer.phone = customer_data['phone']
        db.session.commit() # Commit changes to the database
        return jsonify({"message": "Customer details updated successfully"}), 200 # Display message to user with type indicator
    except SQLAlchemyError as e: # Handle database-related errors
        db.session.rollback()  # Rollback the session to maintain consistency
        return jsonify({"error": str(e)}), 500
    except Exception as e: # Catch any other unexpected errors
        return jsonify({"error": str(e)}), 500

# Delete Customer Route and Method
@app.route('/customers/<int:id>', methods=['DELETE']) # Route to DELETE a customer
def delete_customer(id): # Method to delete customer
    customer = Customer.query.get_or_404(id) # Retrieve customer by customer id or produce 404 if not found
    db.session.delete(customer) # Execute query to delete customer
    db.session.commit() # Commit changes to the database
    return jsonify({"message": "Customer removed successfully"}), 200 # Display message to user with type indicator


# Customer Accout Routes and Methods (id, username, password, customer_id)

# Create New Customer Account Route and Method
@app.route('/customer_accounts', methods=['POST']) # Route to add new customer account
def add_customer_account(): # Method to add new customer account
    try:
        customer_account_data = customer_account_schema.load(request.json) # Validate and deserialize input
    except ValidationError as err: # Error handling
        return jsonify(err.messages), 400 # Jsonify error with type indicator
    
    try: # Adding customer account info into a variable for query execution
        new_customer_account = CustomerAccount(username=customer_account_data['username'], password=customer_account_data['password'], customer_id=customer_account_data['customer id'])
        db.session.add(new_customer_account) # Execute query to add new customer account
        db.session.commit() # Commit changes to the database
        return jsonify({"message": "New customer account added successfully."}), 201 # Display message to user with type indicator
    except SQLAlchemyError as e: # Handle database-related errors
        db.session.rollback()  # Rollback the session to maintain consistency
        return jsonify({"error": str(e)}), 500
    except Exception as e: # Catch any other unexpected errors
        return jsonify({"error": str(e)}), 500

# Get Customer Account Route and Method
@app.route('/customer_accounts/<int:id>', methods=['GET']) # Route to get customer account
def get_customer_account(id): # Method to update customer
    customer_account = CustomerAccount.query.get_or_404(id) # Retrieve customer account by account ID or produce 404 if not found
    return customer_account_schema.jsonify(customer_account)

# Update Customer Account Route and Method
@app.route('/customer_accounts/<int:id>', methods=['PUT']) # Route to UPDATE customer account
def update_customer_account(id): # Method to update customer account
    customer_account = CustomerAccount.query.get_or_404(id) # Retrieve customer account by account ID or produce 404 if not found
    try:
        customer_account_data = customer_account_schema.load(request.json) # Get customer account data
    except ValidationError as err: # Error handling
        return jsonify(err.messages), 400 # Display error message to user with type indicator
    
    try: # Defining customer account data
        customer_account.username = customer_account_data['username']
        customer_account.password = customer_account_data['password']
        db.session.commit() # Commit changes to the database
        return jsonify({"message": "Customer account details updated successfully"}), 200 # Display message to user with type indicator
    except SQLAlchemyError as e: # Handle database-related errors
        db.session.rollback()  # Rollback the session to maintain consistency
        return jsonify({"error": str(e)}), 500
    except Exception as e: # Catch any other unexpected errors
        return jsonify({"error": str(e)}), 500

# Delete Customer Account Route and Method
@app.route('/customer_accounts/<int:id>', methods=['DELETE']) # Route to DELETE a customer account
def delete_customer_account(id): # Method to delete customer account
    try:
        customer_account = CustomerAccount.query.get_or_404(id) # Retrieve customer account by account id or produce 404 if not found
        db.session.delete(customer_account) # Execute query to delete customer account
        db.session.commit() # Commit changes to the database
        return jsonify({"message": "Customer account removed successfully"}), 200 # Display message to user with type indicator
    except SQLAlchemyError as e: # Handle database-related errors
        db.session.rollback()  # Rollback the session to maintain consistency
        return jsonify({"error": str(e)}), 500
    except Exception as e: # Catch any other unexpected errors
        return jsonify({"error": str(e)}), 500
    

# Product Routes and Methods (id, name, price)

# Create New Product Route and Method
@app.route('/products', methods=['POST']) # Route to add new product
def add_product(): # Method to add new product
    try:
        product_data = product_schema.load(request.json) # Validate and deserialize input
    except ValidationError as err: # Error handling
        return jsonify(err.messages), 400 # Jsonify error with type indicator
    
    try: # Adding product info into a variable for query execution
        new_product = Product(name=product_data['name'], price=product_data['price'], quantity=product_data['quantity'])
        db.session.add(new_product) # Execute query to add new product
        db.session.commit() # Commit changes to the database
        return jsonify({"message": "New product added successfully."}), 201 # Display message to user with type indicator
    except SQLAlchemyError as e: # Handle database-related errors
        db.session.rollback()  # Rollback the session to maintain consistency
        return jsonify({"error": str(e)}), 500
    except Exception as e: # Catch any other unexpected errors
        return jsonify({"error": str(e)}), 500

# Get Product Route and Method
@app.route('/products/<int:id>', methods=['GET']) # Route to get product
def get_product(id): # Method to update customer
    product = Product.query.get_or_404(id) # Retrieve product by product ID or produce 404 if not found
    return customer_account_schema.jsonify(product) # Display Product: name, price, quantity

# Update Product Route and Method
@app.route('/products/<int:id>', methods=['PUT']) # Route to UPDATE product
def update_product(id): # Method to update product
    product = Product.query.get_or_404(id) # Retrieve product by product ID or produce 404 if not found
    try:
        product_data = product_schema.load(request.json) # Get product data
    except ValidationError as err: # Validation Error handling
        return jsonify(err.messages), 400 # Display error message to user with type indicator
    
    try: # Defining customer account data
        product.name = product_data['name']
        product.price = product_data['price']
        db.session.commit() # Commit changes to the database
        return jsonify({"message": "Product details updated successfully"}), 200 # Display message to user with type indicator
    except SQLAlchemyError as e: # Handle database-related errors
        db.session.rollback()  # Rollback the session to maintain consistency
        return jsonify({"error": str(e)}), 500
    except Exception as e: # Catch any other unexpected errors
        return jsonify({"error": str(e)}), 500

# Delete Product Route and Method
@app.route('/products/<int:id>', methods=['DELETE']) # Route to DELETE a product
def delete_product(id): # Method to delete product
    try: 
        product = Product.query.get_or_404(id) # Retrieve product by product id or produce 404 if not found
        db.session.delete(product) # Execute query to delete product
        db.session.commit() # Commit changes to the database
        return jsonify({"message": "Product removed successfully"}), 200 # Display message to user with type indicator
    except SQLAlchemyError as e: # Handle database-related errors
        db.session.rollback()  # Rollback the session to maintain consistency
        return jsonify({"error": str(e)}), 500
    except Exception as e: # Catch any other unexpected errors
        return jsonify({"error": str(e)}), 500

# List Products Route and Method
@app.route('/products', methods=['GET']) # Route to get all products
def get_products(): # Method to get all products
    products = Product.query.all() # Retrieve all products and their quantities
    return products_schema.jsonify(products)

# View and Manage Product Stock Levels (Bonus)
@app.route('/products/<int:id>', methods=['PUT']) # Route to UPDATE product
def manage_product_quantity(id): # Method to manage product quantity
    product = Product.query.get_or_404(id) # Retrieve product by product ID or produce 404 if not found
    try:
        product_data = product_schema.load(request.json) # Get customer account data
    except ValidationError as err: # Validation Error handling
        return jsonify(err.messages), 400 # Display error message to user with type indicator
    
    try: # Defining customer account data
        product.quantity = product_data['quantity']
        db.session.commit() # Commit changes to the database
        return jsonify({"message": "Product details updated successfully"}), 200 # Display message to user with type indicator
    except SQLAlchemyError as e: # Handle database-related errors
        db.session.rollback()  # Rollback the session to maintain consistency
        return jsonify({"error": str(e)}), 500
    except Exception as e: # Catch any other unexpected errors
        return jsonify({"error": str(e)}), 500
    
# Restock Products When Low (Bonus)
@app.route('/products/<int:id>', methods=['PUT'])
def restock_product(id):
    product = Product.query.get_or_404(id) # Retrieve product by product ID or produce 404 if not found
    if product:
        try:
            product_data = product_schema.load(request.json) # Get customer account data
        except ValidationError as err: # Validation Error handling
            return jsonify(err.messages), 400 # Display error message to user with type indicator
    
        try:
            product_data['quantity'] = 10
            db.session.commit() # Commit changes to the database
            return jsonify({"message": "Product restocked successfully"}), 200
        except SQLAlchemyError as e: # Handle database-related errors
            db.session.rollback()  # Rollback the session to maintain consistency
            return jsonify({"error": str(e)}), 500
        except Exception as e: # Catch any other unexpected errors
            return jsonify({"error": str(e)}), 500
        

# Order Processing Routes and Methods (id, date, customer_id)

# Create New Order Route and Method
@app.route('/orders', methods=['POST']) # Route to add new order
def create_order(): # Method to create new order
    try:
        order_data = order_schema.load(request.json) # Validate and deserialize input
    except ValidationError as err: # Error handling
        return jsonify(err.messages), 400 # Jsonify error with type indicator
    
    # Adding product info into a variable for query execution
    new_order = Order(id=order_data['id'], date=order_data['date'], customer_id=order_data['customer id'])
    db.session.add(new_order) # Execute query to add new order
    db.session.commit() # Commit changes to the database
    return jsonify({"message": "New product added successfully."}), 201 # Display message to user with type indicator

# Get Order Route and Method
@app.route('/orders/<int:id>', methods=['GET']) # Route to get order
def get_order(id): # Method to get order
    order = Order.query.get_or_404(id) # Retrieve order by order ID or produce 404 if not found
    return order_schema.jsonify(order)

# Track Order Route and Method (Create and track 'Order Status')
@app.route('/orders/<int:id>', methods=['GET']) # Route to get order status
def get_order_status(id):
    order = Order.query.get_or_404(id) # Retrieve order by order ID or produce 404 if not found
    if order:
        try:
            order_details = order_schema.load(request.json) # Get order details
            status = order_details['Status']
            return jsonify({"message": f"Order Status: {status}"})
        except ValidationError as err: # Validation Error handling
            return jsonify(err.messages), 400 # Display error message to user with type indicator

# Cancel Order (Bonus)
@app.route('/orders/<int:id>', methods=['DELETE']) # Route to DELETE an order
def cancel_order(id): # Method to cancel order
    try: 
        order = Order.query.get_or_404(id) # Retrieve order by order id or produce 404 if not found
        db.session.delete(order) # Execute query to delete order
        db.session.commit() # Commit changes to the database
        return jsonify({"message": "Order cancelled successfully"}), 200 # Display message to user with type indicator
    except SQLAlchemyError as e: # Handle database-related errors
        db.session.rollback()  # Rollback the session to maintain consistency
        return jsonify({"error": str(e)}), 500
    except Exception as e: # Catch any other unexpected errors
        return jsonify({"error": str(e)}), 500
    

# Run App
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)