<?php

require_once('functions.php');
require_once('db_connection.php');

set_exception_handler('error_handler');
startup();

if(!$conn) {
  throw new Exception( mysqli_connect_error() );
}

$query = '';
$id = false;

if (!empty($_GET["id"])) {
  $id = $_GET["id"];
  if (!is_numeric($_GET["id"])) {
    throw new Exception("Id must be a number");
  }
  $query = "SELECT `id`, `name`, `price`, `image`, `players`, `time`, `type`, `description`
    FROM `products` WHERE `id` = $id";
} else {
  $query = "SELECT `id`, `name`, `price`, `image`, `players`, `time`, `type` 
    FROM `products`";
}

$result = mysqli_query($conn, $query);

if(!$result) {
  throw new Exception( mysqli_error($conn) );
}

if(mysqli_num_rows($result) === 0) {
  throw new Exception("Invalid Id: {$id}");
}

$output = [];

while($row = mysqli_fetch_assoc($result)) {
  $output[] = $row;
}

// $output['description'] = stripslashes($output['description']);

$json_output = json_encode($output);

echo $json_output;

?>
