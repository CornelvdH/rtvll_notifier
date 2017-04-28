<?php
$fileName = "locations/data/" . $_POST['device_id'] . '.txt';
$fp = fopen($fileName, "w+");

$json_string = json_encode($_POST, JSON_PRETTY_PRINT);

fwrite($fp, $json_string);