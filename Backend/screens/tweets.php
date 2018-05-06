<?php
header("Content-Type: application/json");

require_once 'simple_html_dom.php';
error_reporting(E_ALL);
ini_set('display_errors', 'On');

$tweets = array();

$htmlSite = file_get_html("http://rtvlansingerland.nl/");
$tweets[] = array(
	"content" => "Je luistert naar: ",
	"html" => trim(str_replace("Nu op de radio:", "", $htmlSite->find('.now-on-air', 0)->plaintext))
);

$html = file_get_html('https://twitter.com/search?q=%40RTV_L&src=typd');

$inc = 0;
$max = 7;

foreach($html->find("div.content") as $element){
	$username = "";
	$replyTo = "";
	$content = "";

	$userObj = $element->find(".username", 0);
	$username = trim($userObj->plaintext);
	
	$replyToArr = array();
	foreach($element->find(".js-user-profile-link .username") as $replyToObj){
		$replyToArr[] = trim($replyToObj->plaintext);
	}

	if(($key = array_search($username, $replyToArr)) !== false) {
		unset($replyToArr[$key]);
	}

	$replyTo = implode(" ", $replyToArr);

	$content = $element->find(".tweet-text", 0)->plaintext;
	
	$tweets[] = array(
		"content" => "Twitter mee @RTV_L",
		"html" => "<strong>" . $username . ": </strong>" . $replyTo . " " . $content
	);

	$inc++;

	if($inc >= $max){
		break;
	}
}

$xml = simplexml_load_file("https://xml.buienradar.nl/");

$tweets[] = array(
	"content" => "Het weer in Lansingerland (buienradar.nl)",
	"html" => $xml->weergegevens->verwachting_vandaag->samenvatting[0]->__toString()
);

echo json_encode($tweets);