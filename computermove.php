<?php

$connection = new mysqli('localhost', 'root', '', 'db_test');

if (mysqli_connect_error())
{
    echo "Database connection failed";
    exit;
}

$fielddata = $_REQUEST['field'];
$state = str_split($fielddata);

$weight = "";

foreach($state as $element)
{
    if($element == ",")
    {
        $element = "";
    }
    else
    {
        $weight .= $element;
    }
}

$sql_query = 'SELECT `BoardWeight` FROM `game_state` WHERE `State` = "'.$weight.'"';

$result = $connection->query($sql_query);

while($row = $result->fetch_assoc())
{
     echo $row['BoardWeight'];
}


?>