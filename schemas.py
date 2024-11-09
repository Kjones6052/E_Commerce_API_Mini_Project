# This file contains the code for all Table Schemas used in the application: Customer, CustomerAccount, Product, Order

# Import
from flask import Flask
from flask_marshmallow import Marshmallow
from marshmallow import fields
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__) # Instantiating Flask App
db = SQLAlchemy(app) # Gives full access to SQL database functionality
ma = Marshmallow(app) # Gives access to data parsing and validation

# Customer Schema (id, name, email, and phone number)
class CustomerSchema(ma.Schema):
    id = fields.Integer(required=True)
    name = fields.String(required=True)
    email = fields.String(required=True)
    phone = fields.String(required=True)

    class Meta:
        fields = ("id", "name", "email", "phone")


# CustomerAccount Schema (id, username, password, customer_id)
class CustomerAccountSchema(ma.Schema):
    id = fields.Integer(required=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    customer_id = fields.String(required=True)

    class Meta:
        fields = ("id", "name", "email", "phone")

# Order Schema (id, date, customer_id)
class OrderSchema(ma.Schema):
    id = fields.Integer(required=True)
    date = fields.Date(required=True)
    customer_id = fields.Integer(required=True)

    class Meta:
        fields = ("id", "date", "customer id")

# Product Schema (id, name, price)
class ProductSchema(ma.Schema):
    id = fields.Integer(required=True)
    name = fields.Date(required=True)
    price = fields.Integer(required=True)

    class Meta:
        fields = ("id", "name", "price")