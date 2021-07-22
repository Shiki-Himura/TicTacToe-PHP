<?php

$connection = new mysqli('localhost', 'root', '', 'db_test');

$state = $_REQUEST['state'];
$weight = $_REQUEST['weight'];

if(mysqli_connect_error())
{
    echo "Database connection failed";
    exit;
}


//$sql_query = "INSERT INTO `game_state`(`BoardWeight`) VALUES ('$weight')";
$sql_query = "UPDATE `game_state` SET `BoardWeight`='$weight',`State`='$state'";

$result = $connection->query($sql_query);

?>