<?php
header("Content-Type: application/json");

$arr = array();
$dataDirectory = 'data/';
if ($handle = opendir($dataDirectory)) {
    while (false !== ($file = readdir($handle))){
        if ($file != "." && $file != ".." && strtolower(substr($file, strrpos($file, '.') + 1)) == 'txt'){
        	$contents = file_get_contents($dataDirectory . $file);
        	$obj = json_decode($contents);
        	$arr[] = $obj;
        }
    }
    closedir($handle);
}

echo json_encode($arr, JSON_PRETTY_PRINT);