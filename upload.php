<?php

$connection = new mysqli('localhost', 'root', '', 'db_test');

if(mysqli_connect_error())
{
    echo "Database connection failed";
    exit;
}

$sql_query = 'INSERT INTO `game_state`(`BoardValues`, `BoardState`) VALUES ('$_REQUEST["INSERTVARIABLE"]','$_REQUEST["INSERTVARIABLE"]')';

$result = $connection->query($sql_query);

//check if BoardState AND Values need to be passed to the server 


?>