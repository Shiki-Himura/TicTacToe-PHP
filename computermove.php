<?php

$connection = new mysqli('localhost', 'root', '', 'db_test');

if (mysqli_connect_error())
{
    echo "Database connection failed";
    exit;
}

$fieldData = $_REQUEST['field'];
$stateData = str_split($fieldData);

$stateString = "";

foreach($stateData as $element)
{
    if($element == ",")
    {
        $element = "";
    }
    else
    {
        $stateString .= $element;
    }
}

$sql_query = 'SELECT `BoardWeight` FROM `game_state` WHERE `State` = "'.$stateString.'"';

$result = $connection->query($sql_query);

while($row = $result->fetch_assoc())
{
     echo $row['BoardWeight'];
}


?>