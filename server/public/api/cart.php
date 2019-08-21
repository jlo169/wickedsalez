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

  $product = json_decode(file_get_contents("php://input"), true);
  $productId = intval($product['id']);
  $productQty = $product['qty'];
 
  $checkingQuery = "SELECT * FROM `cart`";
  $checkResult = mysqli_query($conn, $checkingQuery);

  if ($checkResult) {
    $checkNumRows = mysqli_num_rows($checkResult);
    if ($checkNumRows === 0) {
      $query = "INSERT INTO `cart` (`id`, `products_id`, `quantity`)
        VALUES (NULL, $productId, $productQty)";
      $result = mysqli_query($conn, $query);
    } else if ($checkNumRows) {
      $existsInCart = false;
      $updateCartId = '';
      $updateCartQty = '';

      while($row = mysqli_fetch_assoc($checkResult)) {
        if (intval($row['products_id']) === $productId) {
          $existsInCart = true;
          $updateCartId = $row['id'];
          $updateCartQty = $row['quantity'] + $productQty;
        }
      }

      if ($existsInCart) {
        $updateQuery = "UPDATE `cart` SET `quantity`={$updateCartQty} 
          WHERE `id` ={$updateCartId}";

        $result = mysqli_query($conn, $updateQuery);

        if(!$result) {
          throw new Exception( mysqli_error($conn) );
        }
      } else {
        $query = "INSERT INTO `cart` (`id`, `products_id`, `quantity`) 
          VALUES (NULL, $productId, $productQty)";

        $result = mysqli_query($conn, $query);

        if(!$result) {
          throw new Exception( mysqli_error($conn) );
        }
      }
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
    } else {
      throw new Exception('Error ' . mysqli_connect_error());
    }
  }
}

?>