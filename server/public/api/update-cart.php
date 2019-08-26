<?php

require_once('functions.php');
require_once('db_connection.php');
set_exception_handler('error_handler');

startup();

if(!$conn) {
    throw new Exception( mysqli_connect_error() );
}

$cartItemQty = json_decode(file_get_contents("php://input"), true);
$cartId = $cartItemQty['id'];
$cartQty = $cartItemQty['qty'];

$query = "UPDATE `cart` SET `quantity`={$cartQty} 
    WHERE `id` ={$cartId}";

$result = mysqli_query($conn, $query);

if(!$result) {
    throw new Exception( mysqli_error($conn) );
} else {
    $json_output = json_encode($cartQty);

    echo $json_output;
}

?>