<?php

$connection = new mysqli('localhost', 'root', '', 'db_test');

$a = $_REQUEST["state"];
$b = $_REQUEST["weight"];

if(mysqli_connect_error())
{
    echo "Database connection failed";
    exit;
}

$sql_query = "INSERT INTO `game_state`(`BoardState`, `Stateweight`) VALUES ('$a','$b')";

$result = $connection->query($sql_query);


//send possible boardstates to server and initialise a base


?>