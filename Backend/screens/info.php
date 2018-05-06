<!DOCTYPE html>
<html>
<head>
	<title>RTV-LL Notifier</title>
	<meta name="viewport" content="initial-scale=1.0">
	<meta charset="utf-8">
	<script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="webcam.css">
	<style type="text/css">
		body{
			font-size: 24px;
		}
		h3 {
			font-size: 36px;
		}
		ul {
			list-style: none;
			padding-left: 0;
		}
		ul li {
			margin-left: 0;
			padding-left: 0;
		}
	</style>
</head>
<body>
	<?php
	$key = "AIzaSyANN3nQDQ7GeUcFLoab7fam73tSyRbCeN0";
	$anwbKey = "GttEkIuzzOn4b0sGyPw2F6cLtzd64uUH";

	$baseLat = "51.9221145";
    $baseLon = "4.4855899";

    $anwbUrl = "https://api.anwb.nl/v1/routing?apikey=$anwbKey&locations=%s,%s:$baseLat,$baseLon&transportMode=car&polyline=true&instructions=true&maxAlternatives=2&routeType=shortest&traffic=false";

	$url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=%s,%s&key=%s&language=nl";
	$centerItem = $_GET['centerItem'];

	$contents = file_get_contents("http://app.rtvlansingerland.nl/locations/getLocations.php");
	$items = json_decode($contents);

	foreach($items as $k => $v){
		
		if($v->device_name == $centerItem){
			$currentItem = $v;
		}
	}

	//var_dump($currentItem);

	$requestUrl = sprintf($url, $currentItem->latitude, $currentItem->longitude, $key);
	$placeIdResponse = json_decode(file_get_contents($requestUrl));

	$addressComps = array();

	foreach($placeIdResponse->results[0]->address_components as $k => $v){
		if(in_array("locality", $v->types)){
			$addressComps[0] = $v->long_name;
		}

		if(in_array("country", $v->types)){
			$addressComps[1] = $v->long_name;
		}
	}

	$requestUrl = sprintf($anwbUrl, $currentItem->latitude, $currentItem->longitude);
	$distanceResponse = json_decode(file_get_contents($requestUrl));

	$totalDistance = $distanceResponse->routes[0]->summary->distance;
	$totalDistance = round($totalDistance / 1000, 1);
	?>
	<ul>
		<li><strong>Snelheid:</strong> <?php echo $currentItem->speed; ?> km/h</li>
		<li><strong>Plaats:</strong> <?php echo implode(", ", $addressComps); ?></li>
		<li><strong>Afstand tot finish:</strong> <?php echo $totalDistance; ?> km</li>
	</ul>
	<script src="resources/maps.js"></script>
</body>
</html>