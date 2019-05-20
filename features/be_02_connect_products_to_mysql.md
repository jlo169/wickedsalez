# create connection file for mysql

- [ ] create a credential file, mysql_credentials.php
- [ ] in mysql_credential.php, make a connection to your mysql database with your local host, user, password, database, and port.  Assign the resulting connection to the variable $conn
- [ ] create a .gitignore file
- [ ] in the .gitignore file, add mysql_credentials.php to it so that the credentials file won't be tracked by github and stored in a public place
- [ ] create another file, mysql_credentials.php.config, and add the same content as mysql_credentials.php
- [ ] change all real information in mysql_credentials.php.config to fake ones.  For example if your password is "bunnies", change it to "password".
    - this file will serve as a template for the real file for when you install this project on your server
- [ ] in your products.php file, require once the mysql_credentials.php file
- [ ] print_r your $conn variable in your products.php file, make sure you see the connection.
