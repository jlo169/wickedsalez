<?php 

require_once('functions.php');
require_once('db_connection.php');
set_exception_handler('error_handler');

startup();

if(!$conn) {
    throw new Exception( mysqli_connect_error() );
}

$cartDeleteTarget = json_decode(file_get_contents("php://input"), true);
$cartDeleteId = $cartDeleteTarget['id'];

$query = "DELETE FROM `cart_items` WHERE `id` ={$cartDeleteId}";

$result = mysqli_query($conn, $query);

if(!$result) {
    throw new Exception( mysqli_error($conn) );
}

?>