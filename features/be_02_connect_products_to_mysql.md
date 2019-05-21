# create connection file for mysql

- [ ] Confirm the existence of the credential file TEMPLATE, db_connection.php.config
- [ ] copy db_connection.php.config to db_connection.php
- [ ] in db_connection.php, make a connection to your mysql database with your local host, user, password, database, and port.  Assign the resulting connection to the variable $conn
- [ ] verify the .gitignore file
- [ ] in the .gitignore file, verify that db_connection.php has been ignored.
- [ ] In db_connection.php, change all the dummy information to real information for your database. 
- [ ] in your products.php file, require once the db_connection.php file
- [ ] test your $conn variable.  If it is falsey, then throw an exception, and send it your mysqli_connect_error return value.
