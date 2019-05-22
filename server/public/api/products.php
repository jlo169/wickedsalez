<?php

require_once('functions.php');
require_once('db_connection.php');

set_exception_handler('error_handler');

$output = file_get_contents('dummy-products-list.json');

if(!$conn) {
  die("Connect Error: " . mysqli_connect_error() );
}

var_dump($conn);

echo $output;

// header('Content-Type: application/json');

// if (empty($_GET['id'])) {
//   readfile('dummy-products-list.json');
// } else {
//   readfile('dummy-product-details.json');
// }

?>
