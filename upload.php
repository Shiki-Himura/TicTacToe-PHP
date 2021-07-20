<?php

$connection = new mysqli('localhost', 'root', '', 'db_test');

//$a = $_POST["weight"];
$b = $_REQUEST["state"];

if(mysqli_connect_error())
{
    echo "Database connection failed";
    exit;
}

$sql_query = "INSERT INTO `game_state`(`BoardState`) VALUES ('$b')";

$result = $connection->query($sql_query);


//send possible boardstates to server and initialise a base


?>