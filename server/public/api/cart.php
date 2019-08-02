<?php

require_once('functions.php');
require_once('db_connection.php');

set_exception_handler('error_handler');
startup();

if(!$conn) {
  throw new Exception( mysqli_connect_error() );
}

$method = $_SERVER['REQUEST_METHOD'];

if($method == 'GET') {
  $query = "SELECT p.`id`, p.`name`, p.`price`, p.`image`, p.`description`, c.`quantity`
    FROM `products` AS p
    JOIN `cart` AS c
    ON p.`id` = c.`products_id`";

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

} else if ($method == 'POST') {
  $productId = json_decode(file_get_contents("php://input"));
  // $productQuantity = intval($_POST["quantity"]);

  $query = "INSERT INTO `cart` (`id`, `products_id`, `quantity`) 
    VALUES (NULL, $productId, 1)";

  $result = mysqli_query($conn, $query);

  $lastId = mysqli_insert_id($conn);

  if(!$result) {
    throw new Exception( mysqli_error($conn) );
  }

  $postQuery = "SELECT p.`id`, p.`name`, p.`price`, p.`image`, p.`description`
    FROM `products` AS p
    JOIN `cart`
    ON p.`id` = cart.`products_id`
    WHERE cart.`id` = $lastId";

  $postResult = mysqli_query($conn, $postQuery);

  if(!$postResult) {
    throw new Exception( mysqli_error($conn) );
  }

  $postOutput = mysqli_fetch_assoc($postResult);

  echo json_encode($postOutput);
  
}




// $method = $_SERVER['REQUEST_METHOD'];
// $item = file_get_contents('php://input');

// if ($method == 'GET') {
//   readfile('dummy-cart-items.json');
// } else if ($method == 'POST') {
//   http_response_code(201);
//   print($item);
// } else {
//   http_response_code(404);
//   print(json_encode([
//     'error' => 'Not Found',
//     'message' => "Cannot $method /api/cart.php"
//   ]));
// }

?>
