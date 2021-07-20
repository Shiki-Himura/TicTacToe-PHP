<?php

$connection = new mysqli('localhost', 'root', '', 'db_test');

if (mysqli_connect_error())
{
    echo "Database connection failed";
    exit;
}

$sql_query = 'SELECT* FROM game_state';

$result = $connection->query($sql_query);

while($row = $result->fetch_assoc())
{
    $temp = $row["BoardState"];
}

echo $temp;



?>