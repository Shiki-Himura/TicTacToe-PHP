<?php

$connection = new mysqli('localhost', 'root', '', 'db_test');

if(mysqli_connect_error())
{
    echo "Database connection failed";
    exit;
}

$statedata = $_REQUEST['state'];
$weightdata = $_REQUEST['weight'];

$statearray = str_split($statedata);
$weightarray = str_split($weightdata);

$state = "";
$weight = "";

foreach($statearray as $element)
{
    if($element != ",")
    {
        $state .= $element;
    }
}

foreach($weightarray as $element)
{
    if($element != ",")
    {
        $weight .= $element;
    }
}


$sql_query = 'UPDATE `game_state` SET `BoardWeight`="'.$weight.'" WHERE `State` = "'.$state.'"';

$result = $connection->query($sql_query);

var_dump($weight);

?>