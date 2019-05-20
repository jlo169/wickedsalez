# create schema, table, and fill with data

- [ ] Create a schema for the products table based on the dummy data in products_list.json
    - don't forget the id (and make it unsigned)
- [ ] create a database, wickedSales, in your phpmyadmin
    - you will only need to do this once locally.
- [ ] create a table, products,  based on your schema
- [ ] fill your products table with dummy data based on your dummy data file
- [ ] write a query to test select your dummy data.  If a query requires data for a WHERE clause, fill in a dummy value.
- [ ] in your products.php file, put in your query and assign it to a variable, $query
- [ ] make a variable, result.  Assign to it the result of a mysqli_query function call using your $conn variable and your $query
- [ ] make a conditional that tests if result is not truthy.  If it is not, throw an exception and pass in a mysqli_error so you know what happened.
- [ ] create an associative array variable, output
    - give it a key of success with value true
    - give it a key of data, with a value of an empty array
- [ ] loop through the data coming from the result
    - push it into the $output['data'] key
- [ ] json encode the output data
- [ ] print the json data
- [ ] use postman to hit your endpoint and test the data is coming out correctly