# This file contains the main code for the application

# Import
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import fields, ValidationError
from models import Customer, CustomerAccount, Order, order_product, Product
# import models
from schemas import CustomerSchema, CustomerAccountSchema, OrderSchema, ProductSchema

app = Flask(__name__) # Instantiating Flask App
db = SQLAlchemy(app) # Gives full access to SQL database functionality
ma = Marshmallow(app) # Gives access to data parsing and validation

# model = models()
customer_model = Customer()
customer_account_model = CustomerAccount()
order_model = Order()
product_model = Product()

customer_schema = CustomerSchema()
customer_account_schema = CustomerAccountSchema()

order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

# Customer Routes and Methods (id, name, email, and phone number)

# Create New Customer Route and Method
@app.route('/customers', methods=['POST']) # Route to add new customer
def add_customer(): # Method to add new customer
    try:
        customer_data = customer_schema.load(request.json) # Validate and deserialize input
    except ValidationError as err: # Error handling
        return jsonify(err.messages), 400 # Jsonify error with type indicator
    
    # Adding customer info into a variable for query execution
    new_customer = Customer(id=customer_data['id'], name=customer_data['name'], email=customer_data['email'], phone=customer_data['phone'])
    db.session.add(new_customer) # Execute query to add new customer
    db.session.commit() # Commit changes to the database
    return jsonify({"message": "New Customer added successfully."}), 201 # Display message to user with type indicator

# Get Customer Route and Method
@app.route('/customers/<int:id>', methods=['GET']) # Route to get customer
def get_customer(id): # Method to get customer
    customer = customer_model.query.get_or_404(id) # Retrieve customer by customer ID or produce 404 if not found
    return customer_schema.jsonify(customer)

# Update Customer Route and Method
@app.route('/customers/<int:id>', methods=['PUT']) # Route to UPDATE customer
def update_customer(id): # Method to update customer
    customer = customer_model.query.get_or_404(id) # Retrieve customer by customer ID or produce 404 if not found
    try:
        customer_data = customer_schema.load(request.json) # Get customer data
    except ValidationError as err: # Error handling
        return jsonify(err.messages), 400 # Display error message to user with type indicator
    
    # Updating customer data
    customer.id = customer_data['id']
    customer.name = customer_data['name']
    customer.email = customer_data['email']
    customer.phone = customer_data['phone']
    db.session.commit() # Commit changes to the database
    return jsonify({"message": "Customer details updated successfully"}), 200 # Display message to user with type indicator

# Delete Customer Route and Method
@app.route('/customers/<int:id>', methods=['DELETE']) # Route to DELETE a customer
def delete_customer(id): # Method to delete customer
    customer = customer_model.query.get_or_404(id) # Retrieve customer by customer id or produce 404 if not found
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
    
    # Adding customer account info into a variable for query execution
    new_customer_account = customer_account_model(id=customer_account_data['id'], username=customer_account_data['username'], password=customer_account_data['password'], customer_id=customer_account_data['customer id'])
    db.session.add(new_customer_account) # Execute query to add new customer account
    db.session.commit() # Commit changes to the database
    return jsonify({"message": "New customer account added successfully."}), 201 # Display message to user with type indicator

# Get Customer Account Route and Method
@app.route('/customer_accounts/<int:id>', methods=['GET']) # Route to get customer account
def get_customer_account(id): # Method to update customer
    customer_account = customer_account_model.query.get_or_404(id) # Retrieve customer account by account ID or produce 404 if not found
    return customer_account_schema.jsonify(customer_account)

# Update Customer Account Route and Method
@app.route('/customer_accounts/<int:id>', methods=['PUT']) # Route to UPDATE customer account
def update_customer_account(id): # Method to update customer account
    customer_account = customer_account_model.query.get_or_404(id) # Retrieve customer account by account ID or produce 404 if not found
    try:
        customer_account_data = customer_account_schema.load(request.json) # Get customer account data
    except ValidationError as err: # Error handling
        return jsonify(err.messages), 400 # Display error message to user with type indicator
    
    # Defining customer account data
    customer_account.id = customer_account_data['id']
    customer_account.username = customer_account_data['username']
    customer_account.password = customer_account_data['password']
    customer_account.customer_id = customer_account_data['customer id']
    db.session.commit() # Commit changes to the database
    return jsonify({"message": "Customer account details updated successfully"}), 200 # Display message to user with type indicator

# Delete Customer Account Route and Method
@app.route('/customer_accounts/<int:id>', methods=['DELETE']) # Route to DELETE a customer account
def delete_customer_account(id): # Method to delete customer account
    customer_account = customer_account_model.query.get_or_404(id) # Retrieve customer account by account id or produce 404 if not found
    db.session.delete(customer_account) # Execute query to delete customer account
    db.session.commit() # Commit changes to the database
    return jsonify({"message": "Customer account removed successfully"}), 200 # Display message to user with type indicator


# Product Routes and Methods (id, name, price)

# Create New Product Route and Method
@app.route('/products', methods=['POST']) # Route to add new product
def add_product(): # Method to add new product
    try:
        product_data = product_schema.load(request.json) # Validate and deserialize input
    except ValidationError as err: # Error handling
        return jsonify(err.messages), 400 # Jsonify error with type indicator
    
    # Adding product info into a variable for query execution
    new_product = product_model(id=product_data['id'], name=product_data['name'], price=product_data['price'])
    db.session.add(new_product) # Execute query to add new product
    db.session.commit() # Commit changes to the database
    return jsonify({"message": "New product added successfully."}), 201 # Display message to user with type indicator

# Get Product Route and Method
@app.route('/products/<int:id>', methods=['GET']) # Route to get product
def get_product(id): # Method to update customer
    product = product_model.query.get_or_404(id) # Retrieve product by product ID or produce 404 if not found
    return customer_account_schema.jsonify(product)

# Update Product Route and Method
@app.route('/products/<int:id>', methods=['PUT']) # Route to UPDATE product
def update_product(id): # Method to update product
    product = product_model.query.get_or_404(id) # Retrieve product by product ID or produce 404 if not found
    try:
        product_data = product_schema.load(request.json) # Get customer account data
    except ValidationError as err: # Error handling
        return jsonify(err.messages), 400 # Display error message to user with type indicator
    
    # Defining customer account data
    product.id = product_data['id']
    product.name = product_data['name']
    product.price = product_data['price']
    db.session.commit() # Commit changes to the database
    return jsonify({"message": "Product details updated successfully"}), 200 # Display message to user with type indicator

# Delete Product Route and Method
@app.route('/products/<int:id>', methods=['DELETE']) # Route to DELETE a product
def delete_product(id): # Method to delete product
    product = product_model.query.get_or_404(id) # Retrieve product by product id or produce 404 if not found
    db.session.delete(product) # Execute query to delete product
    db.session.commit() # Commit changes to the database
    return jsonify({"message": "Product removed successfully"}), 200 # Display message to user with type indicator

# List Products Route and Method
@app.route('/products', methods=['GET']) # Route to get all products
def get_product(id): # Method to get all products
    products = product_model.query.all() # Retrieve all products
    return products_schema.jsonify(products)

# View and Manage Product Stock Levels (Bonus)
# Restock Products When Low (Bonus)

# Order Processing Routes and Methods (id, date, customer_id)

# Create New Order Route and Method
@app.route('/orders', methods=['POST']) # Route to add new order
def new_order(): # Method to create new order
    try:
        order_data = order_schema.load(request.json) # Validate and deserialize input
    except ValidationError as err: # Error handling
        return jsonify(err.messages), 400 # Jsonify error with type indicator
    
    # Adding product info into a variable for query execution
    new_order = order_model(id=order_data['id'], date=order_data['date'], customer_id=order_data['customer id'])
    db.session.add(new_order) # Execute query to add new order
    db.session.commit() # Commit changes to the database
    return jsonify({"message": "New product added successfully."}), 201 # Display message to user with type indicator

# Get Order Route and Method
@app.route('/orders/<int:id>', methods=['GET']) # Route to get order
def get_order(id): # Method to get order
    order = order_model.query.get_or_404(id) # Retrieve order by order ID or produce 404 if not found
    return order_schema.jsonify(order)

# Track Order Route and Method
# Manage Order History (Bonus)
# Cancel Order (Bonus)
# Calculate Order Total (Bonus)