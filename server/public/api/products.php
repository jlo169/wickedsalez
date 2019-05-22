<?php

require_once('functions.php');
require_once('db_connection.php');

set_exception_handler('error_handler');

if(!$conn) {
  throw new Exception( mysqli_connect_error() );
}

var_dump($conn);

// header('Content-Type: application/json');

// if (empty($_GET['id'])) {
//   readfile('dummy-products-list.json');
// } else {
//   readfile('dummy-product-details.json');
// }

?>
