<?php

require_once('functions.php');
require_once('db_connection.php');

set_exception_handler('error_handler');
startup();
session_start();

if(!$conn) {
  throw new Exception( mysqli_connect_error() );
}

$cartId = $_SESSION['cartId'];

$method = $_SERVER['REQUEST_METHOD'];
$order = json_decode(file_get_contents('php://input'), true);
$oName = $order['name'];
$oAddress = $order['address'];
$oCity = $order['city'];
$oState = $order['state'];
$oZipcode = $order['zipcode'];
$oSubtotal = $order['subtotal'] * 100;
$oShipping = $order['shipping'] * 100;
$oTax = $order['tax'] * 100;
$oOrderTotal = intval($order['orderTotal']) * 100;

$orderQuery = "INSERT INTO `orders`(`id`, `name`, `address`, `city`, `state`, `zipcode`, `subtotal`, `shipping`, `tax`, `orderTotal`, `cart_id`) 
  VALUES (NULL, '$oName', '$oAddress', '$oCity', '$oState', '$oZipcode', $oSubtotal, $oShipping, $oTax, $oOrderTotal, $cartId)";

if (mysqli_query($conn, $orderQuery)) {
  $orderInsertedId = mysqli_insert_id($conn);
  $orderReturnQuery = "SELECT * FROM `orders` WHERE id = $orderInsertedId";

  $result = mysqli_query($conn, $orderReturnQuery);
  $output = mysqli_fetch_assoc($result);

  $cartItemCheckQuery = "SELECT p.`name`, ci.`quantity`
    FROM cart_items AS ci
    JOIN products AS p ON p.`id` = ci.`products_id`
    WHERE ci.`cart_id` = $cartId";

  $productArr = [];

  $cartItemCheckResult = mysqli_query($conn, $cartItemCheckQuery);
  while($row = mysqli_fetch_assoc($cartItemCheckResult)) {
    $productArr[] = $row;
  };

  $output['products'] = $productArr;

  if(!mysqli_query($conn, "DELETE FROM `cart_items` WHERE `cart_id` = $cartId")) {
    throw new Exception('Error: failed to delete items from cart' . mysqli_connect_error());
  };

  echo json_encode($output);
};

?>
