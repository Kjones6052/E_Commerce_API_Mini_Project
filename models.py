# This file contains the code for all Table Models used in the application: Customer, CustomerAccount, Product, Order

# Import
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


# Instantiating Flask App
app = Flask(__name__) 

# Configure SQLAlchemy to connect to database using connection parameteres
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:7Raffi!Codes7@localhost/e_commerce_db'

db = SQLAlchemy(app) # Gives full access to SQL database functionality


# Customer Model (id, name, email, and phone number)
class Customer(db.Model):
    __tablename__ = "Customers" # Defines table for Customers
    id = db.Column(db.Integer, primary_key=True) # Creating id as the primary key for table
    name = db.Column(db.String(255), nullable=False) # Creating name column for table
    email = db.Column(db.String(320)) # Creating email column for table
    phone = db.Column(db.String(15)) # Creating phone column for table
    orders = db.relationship('Order', backref='customer') # Establishing relationship between Customer and Order

# CustomerAccount Model (id, username, password, customer_id)
class CustomerAccount(db.Model):
    __tablename__ = "Customer_Accounts" # Defines table for Customer Accounts
    id = db.Column(db.Integer, primary_key=True) # Creating id as the primary key for table
    username = db.Column(db.String(255), unique=True, nullable=False) # Creating User Name column for table
    password = db.Column(db.String(255), nullable=False) # Creating Password column for table
    customer_id = db.Column(db.Integer, db.ForeignKey('Customers.id')) # Creating Customer ID as foreign key column for table
    customer = db.relationship('Customer', backref='customer_account', uselist=False) # Establishing one-to-one relationship to and from Customers table

# Order Model (id, date, customer_id)
class Order(db.Model):
    __tablename__ = "Orders" # Defines table for orders
    id = db.Column(db.Integer, primary_key=True) # Creating id as the primary key for table
    date = db.Column(db.Date, nullable=False) # Creating date column for table
    customer_id = db.Column(db.Integer, db.ForeignKey('Customers.id')) # Creating customer id as a foreign key column for table
    status = db.Column(db.String(20), nullable=False) # Creating order status column for table
   
# Many to Many relationship products/orders
order_details = db.Table('Order_Details',
                         db.Column('order_id', db.Integer, db.ForeignKey('Orders.id'), primary_key=True),
                         db.Column('product_id', db.Integer, db.ForeignKey('Products.id'), primary_key=True)
                         )

# Product Model (id, name, price)
class Product(db.Model):
    __tablename__ = "Products"
    id = db.Column(db.Integer, primary_key=True) # Creating id as the primary key for table
    name = db.Column(db.String(255), nullable=False) # Creating name column for table
    price = db.Column(db.Float, nullable=False) # Creating price column for table
    quantity = db.Column(db.Integer, nullable=False) # Creating quantity column for table
    orders = db.relationship('Order', secondary=order_details, backref=db.backref('products')) # Creating relationship between Products and Order
    

