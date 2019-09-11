<?php

require_once('functions.php');
require_once('db_connection.php');

set_exception_handler('error_handler');
startup();
session_start();

if(!$conn) {
  throw new Exception( mysqli_connect_error() );
}

$cartId = null;
if (isset($_SESSION['cartId'])) {
  $cartId = $_SESSION['cartId'];
} else {
  $newUserQuery = "INSERT INTO `cart`(`id`, `created`, `user_id`, `cart_status`) 
    VALUES (NULL, CURRENT_DATE, NULL, NULL)";

  if(mysqli_query($conn, $newUserQuery)) {
    $lastId = mysqli_insert_id($conn);
    $_SESSION['cartId'] = $lastId;
    $cartId = $_SESSION['cartId'];
  }
}

$method = $_SERVER['REQUEST_METHOD'];

if($method == 'GET') {
  $query = "SELECT p.`id`, ci.`id` AS `cartitems_id`, p.`name`, p.`price`, p.`image`, p.`description`, ci.`quantity`
    FROM `products` AS p
    JOIN `cart_items` AS ci ON p.`id` = ci.`products_id`
    JOIN `cart` AS c ON ci.`cart_id` = c.`id`
    WHERE c.`id` = $cartId";

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
 
  $checkingQuery = "SELECT ci.`id`, ci.`products_id`, ci.`quantity`, ci.`cart_id` 
    FROM `cart_items` AS ci 
    JOIN `cart` AS c 
    WHERE ci.`cart_id` = c.`id` AND c.`id` = $cartId";
  $checkResult = mysqli_query($conn, $checkingQuery);

  if ($checkResult) {
    $checkNumRows = mysqli_num_rows($checkResult);

    if ($checkNumRows === 0) {
      $query = "INSERT INTO `cart_items` (`id`, `products_id`, `quantity`, `cart_id`)
        VALUES (NULL, $productId, $productQty, $cartId)";
      $result = mysqli_query($conn, $query);
    } else if ($checkNumRows) {
      $existsInCart = false;
      $updateCartId = '';
      $updateCartQty = '';

      while($row = mysqli_fetch_assoc($checkResult)) {
        if (intval($row['products_id']) === $productId) {
          $existsInCart = true;
          $updateCartId = $row['id'];
          $updateCartQty = $productQty;
        }
      }

      if ($existsInCart) {
        $updateQuery = "UPDATE `cart_items` SET `quantity`={$updateCartQty} 
          WHERE `id` ={$updateCartId}";

        $result = mysqli_query($conn, $updateQuery);

        if(!$result) {
          throw new Exception( mysqli_error($conn) );
        }
      } else {
        $query = "INSERT INTO `cart_items` (`id`, `products_id`, `quantity`, `cart_id`) 
          VALUES (NULL, $productId, $productQty, $cartId)";

        $result = mysqli_query($conn, $query);

        if(!$result) {
          throw new Exception( mysqli_error($conn) );
        }
      }
    } else {
      throw new Exception('Error ' . mysqli_connect_error());
    }
  $query = "SELECT p.`id`, p.`name`, p.`price`, p.`image`, p.`description`, ci.`quantity`, ci.`id` AS cartitems_id
    FROM `products` AS p
    JOIN `cart_items` AS ci ON p.`id` = ci.`products_id`
    JOIN `cart` ON ci.`cart_id` = cart.`id`
    WHERE cart.`id` = $cartId";

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

  }
}

?>