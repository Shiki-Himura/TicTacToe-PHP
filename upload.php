<?php

$connection = new mysqli('localhost', 'root', '', 'db_test');

if(mysqli_connect_error())
{
    echo "Database connection failed";
    exit;
}
$statedata = $_REQUEST['set'];
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

foreach ($statearray as $key => $value)
{
    if($value == "0")
    {
        $weight .= "5";
    }
    elseif($value == "1" || $value == "2")
    {
        $weight .= "0";
    }
}


$sql_query = "INSERT INTO `game_state`(`State`, `BoardWeight`) VALUES ('$state','$weight')";
$result = $connection->query($sql_query);

?>