<?php

$connection = new mysqli('localhost', 'root', '', 'db_test');

if (mysqli_connect_error())
{
    echo "Database connection failed";
    exit;
}

$sql_query = 'SELECT* FROM game_state';

$result = $connection->query($sql_query);


$temparray = array();
while($row = $result->fetch_assoc())
{
    $temparray[] = $row["Stateweight"]." ".$row["BoardState"];
    $trimmed_array = array_map('trim', $temparray);
    foreach ($trimmed_array as $value) 
    {
        echo $value;
    }
}


?>