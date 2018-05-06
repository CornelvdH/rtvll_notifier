<?php

if(isset($_POST['device_id']) && !empty($_POST['device_id'])){
	if($_POST['type'] == 'video'){
		$fileName = "locations/video/" . $_POST['device_id'] . '.txt';
	} else {
		$fileName = "locations/data/" . $_POST['device_id'] . '.txt';
	}

	$jsonString = json_encode($_POST, JSON_PRETTY_PRINT);

	$result = file_put_contents($fileName, $jsonString);
	if($result === false){
		error_log('Writing data from ' . $_POST['device_id'] . ' failed.');
	}
}

