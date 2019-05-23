<?php

require_once('functions.php');
require_once('db_connection.php');

set_exception_handler('error_handler');
startup();

if(!$conn) {
  throw new Exception( mysqli_connect_error() );
}

$whereClause = '';

if (!empty($_GET["id"])) {
  $id = $_GET["id"];
  $whereClause = "WHERE `id` = $id";
}

$query = "SELECT `id`, `name`, `price`, `image`, `shortDescription` FROM `products` $whereClause";
$result = mysqli_query($conn, $query);

if(!$result) {
  throw new Exception( mysqli_error($conn) );
}

$output = [];

while($row = mysqli_fetch_assoc($result)) {
  array_push($output, $row);
}

$json_output = json_encode($output);

echo $json_output;

// header('Content-Type: application/json');

// if (empty($_GET['id'])) {
//   readfile('dummy-products-list.json');
// } else {
//   readfile('dummy-product-details.json');
// }

?>
