<?php
header("Content-type: application/json");
$xml = simplexml_load_file("http://roparunlive.nl/xml/TeamsTotaal.xml?t=" . date("U"));
//var_dump($xml->t[1]);

$itemsToUse = array(
"33",
"162",
"171",
"225",
"247",
"318");

$teams = array();

foreach($xml->t as $item){
	if(in_array($item->a, $itemsToUse)){

		$team = array();
		$team["id"] = $item->a[0]->__toString();
		$team["name"] = $item->o[0]->__toString();
		$team["latitude"] = $item->n[0]->__toString();
		$team["longitude"] = $item->m[0]->__toString();
		$team["current_speed"] = $item->i[0]->__toString();
		$team["finish_time"] = $item->l[0]->__toString();
		$team["current_pos"] = $item->f[0]->__toString();

		$teams[] = $team;
	}
}

echo json_encode($teams, JSON_PRETTY_PRINT);