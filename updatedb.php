<?php

$connection = new mysqli('localhost', 'root', '', 'db_test');

if(mysqli_connect_error())
{
    echo "Database connection failed";
    exit;
}

$statedata = $_REQUEST['field'];
$weightdata = $_REQUEST['weight'];
$statearray = str_split($statedata);

$state = "";
$weight = "";

foreach($statearray as $element)
{
    if($element != ",")
    {
        $state .= $element;
    }
}



$sql_query = 'UPDATE `game_state` SET `BoardWeight`="'.$weight.'" WHERE `State` = "'.$state.'"';

$result = $connection->query($sql_query);


?>