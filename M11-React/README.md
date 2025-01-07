# **Hello, World!**

The files conainted in this folder of the repository are used to develop the React portion of the E Commerce API mini-project, links to
the main folder, python folder, and react folder can be found below: 

[Master Folder](https://github.com/Kjones6052/E_Commerce_API_Mini_Project/tree/master)
[Python Folder](https://github.com/Kjones6052/E_Commerce_API_Mini_Project/tree/master/M6-Python)
[React Folder](https://github.com/Kjones6052/E_Commerce_API_Mini_Project/tree/master/M11-React/eCommerceReact)


Overview:

This portion of the project focuses on React functional components to create a user interface that accesses and works with the SQL 
Database to send and recieve data for an e commerce application. All the files I created will be located in the src folder, which includes 
a main.jsx and app.jsx which run the main app code. Also included in the src folder is a components folder, which includes 3 additional 
folders for customers, orders, and products, as well as jsx files for the home page, navigation bar, and not found page. Each of the 3 
additional folders contain code files for pages related to the title of each folder(e.g. customers has files specific to customer 
components).


Features List and How To Use Them:

- Customers
    - Add New Customer: Use navigation bar to navigate to 'New Customer', new page will include a form, fill out the form on the New Customer page and click submit button, if form validates then new customer will be created in the database. After successful submit 
    page will redirect to home page.
    - Search Customers: Use navigation bar to navigate to 'Search Customers', new page will display list of customers each with a button 
    to view details. From this page you can add new customer or view customer details.
    - View Customer Details: Click on the view details button next to the customer you want to view, new page will display all customer 
    information and buttons to edit customer or delete customer. Edit customer leads to new page, delete customer will remove that 
    customer from the database and return to the list of customers.
    - Edit Customer Details: Click on the edit customer button in the customer details page, will produce a new page with a form that 
    allows you to edit all customer information details. Update customer information and click submit, successful submit will lead back to 
    home page.
    - Delete Customer: Click on the delete customer button in the customer details page, will delete customer from database as long as customer does not have an associated customer account. If customer has a customer account, customer account must be deleted first. Page will redirect to home page after successful deletion.
- Customer Accounts
    - Add New Customer Account: Use navigation bar to navigate to 'New Customer Account', new page will include a form, fill out the form 
    on the New Customer Account page and click submit button, if form validates then new customer account will be created in the database. 
    After successful submit page will redirect to home page.
    - Search Customer Accounts: Use navigation bar to navigate to 'Search Customer Accounts', new page will display list of customer 
    accounts each with a button to view details. From this page you can add new customer or view customer details.
    - View Customer Account Details: Click on the view details button next to the customer account you want to view, new page will display 
    all customer account information and buttons to edit or delete customer account. Edit customer account leads to new page, delete 
    customer account will remove that customer from the database and return to the list of customers.
    - Edit Customer Account Details: Click on the edit customer account button in the customer account details page, will produce a new 
    page with a form that allows you to edit all customer account information details. Update customer account information and click 
    submit, successful submit will lead back to home page.
    - Delete Customer Account: Click on the delete customer account button in the customer account details page, will delete customer 
    account from database as long as customer has an associated customer account.
- Products
    - View Products: Use navigation bar to navigate to 'View Products', new page will display list of products currently available with 
    button to view product details that will take you to a new page when clicked, there is also a button to add a new product at the 
    end of the products list.
    - Add New Product: Use navigation bar to navigate to 'Add Product', new page will include a form to be filled out with product data, 
    fill out the form and click submit to add a new product to the database. After successful addition of product the page will redirect 
    to the products list page.
    - Product Details: From the View Products page, click on view details next to a product, the page will refresh with product 
    information for the product selected including a button to edit product and a button to delete product. Deleting the product will 
    remove the product from the database, and edit product will redirect to a form to edit product data.
    - Edit Product: From the product details page click on Edit Product, fill out the form to change product info and click submit, after 
    successful submission the page will redirect to the View Products page.
    - Delete Product: From the product details page click on Delete Product, this will remove the product from the database and return 
    back to the View Products page.
- Orders
    - Create Order: From the product details page click on Order Product, the page will redirect to display product information including 
    name and price, as well as today's date and an input field to input customer id. With customer id input click submit and the order 
    will be placed and added to the database.



# *Thank you*