# This file contains the code for all Table Schemas used in the application: Customer, CustomerAccount, Product, Order

# Import

from flask_marshmallow import Marshmallow
from marshmallow import fields
from models import app


ma = Marshmallow(app) # Gives access to data parsing and validation

# Customer Schema (id, name, email, and phone number)
class CustomerSchema(ma.Schema):
    name = fields.String(required=True)
    email = fields.String(required=True)
    phone = fields.String(required=True)

    class Meta:
        fields = ("id", "name", "email", "phone")


# CustomerAccount Schema (id, username, password, customer_id)
class CustomerAccountSchema(ma.Schema):
    username = fields.String(required=True)
    password = fields.String(required=True)
    customer_id = fields.String(required=True)

    class Meta:
        fields = ("id", "username", "password", "customer_id")

# Order Schema (id, date, customer_id, status)
class OrderSchema(ma.Schema):
    date = fields.Date(required=True)
    customer_id = fields.Integer(required=True)
    status = fields.String(required=True)

    class Meta:
        fields = ("id", "date", "customer_id", "status")

# Product Schema (id, name, price, quantity)
class ProductSchema(ma.Schema):
    name = fields.String(required=True)
    price = fields.Float(required=True)
    quantity = fields.Integer(required=True)

    class Meta:
        fields = ("id", "name", "price", "quantity")

customer_schema = CustomerSchema()
customer_account_schema = CustomerAccountSchema()

order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)