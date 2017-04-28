var map;
var markers = {};

var teams = {};

var infoWindows = {};
var teamInfoWindows = {};

function parseMessageBundle(message, bundle){
	for(var b in bundle){
		var current = bundle[b];

		var regex = new RegExp('{' + b + '}', "g");
		message = message.replace(regex, current);
	}

	return message;
}

function getTeamData(){
	$.get("locations/getTeamData.php", function(data){
		
		$(".team-info").empty();
		
		for(var d in data){
			var current = data[d];
			var latLng = new google.maps.LatLng(current.latitude, current.longitude);

			if(current.id in teams){
				teams[current.id].setPosition(latLng);
			} else {
				teams[current.id] = new google.maps.Marker({
					position: latLng,
					map: map,
					title: current.name,
					icon: 'http://app.rtvlansingerland.nl/resources/team.png'
				});
			}

			var content = parseMessageBundle(messages.teams.popup, current);

			if(current.id in teamInfoWindows){
				teamInfoWindows[current.id].setPosition(latLng);
				teamInfoWindows[current.id].setContent(content);
			} else {
				teamInfoWindows[current.id] = new google.maps.InfoWindow({
					content: content
				}); 

				teams[current.id].addListener('click', function() {
					teamInfoWindows[current.id].open(map, teams[current.id]);
				});
			}

			var windowContent = parseMessageBundle(messages.teams.window, current);

			$(".team-info").append(windowContent);
			setHandlers();
		}
	});
}

function getLocations(){
	$.get("locations/getLocations.php", function(data){
		
		$(".location-info").empty();
		
		for(var d in data){
			var current = data[d];

			var latLng = new google.maps.LatLng(current.latitude, current.longitude);

			if(current.device_id in markers){
				markers[current.device_id].setPosition(latLng);
			} else {
				markers[current.device_id] = new google.maps.Marker({
					position: latLng,
					map: map,
					title: current.device_name,
					icon: 'http://app.rtvlansingerland.nl/resources/mic.png'
				});

			}
			// Fix speed notation.
			current.speed = Math.round(current.speed * 3.6);
			var content = parseMessageBundle(messages.locations.popup, current);
			
			if(current.device_id in infoWindows){
				infoWindows[current.device_id].setPosition(latLng);
				infoWindows[current.device_id].setContent(content);
			} else {
				infoWindows[current.device_id] = new google.maps.InfoWindow({
					content: content
				}); 
			}

			var windowContent = parseMessageBundle(messages.locations.window, current);
			
			$(".location-info").append(windowContent);
			setHandlers();

		}

	});
}

function getRoute(){
	$.ajax({
		type: "GET",
		url: "resources/route.gpx",
		dataType: "xml",
		success: function (xml) {
			var points = [];
			var bounds = new google.maps.LatLngBounds();
			$(xml).find("trkpt").each(function () {
				var lat = $(this).attr("lat");
				var lon = $(this).attr("lon");
				var p = new google.maps.LatLng(lat, lon);
				points.push(p);
				bounds.extend(p);
			});
			var poly = new google.maps.Polyline({
				// use your own style here
				path: points,
				strokeColor: "#FF00AA",
				strokeOpacity: .7,
				strokeWeight: 4
			});
			poly.setMap(map);
        }
    });
}

function setHandlers(){
	$(".location-item").click(function(e){
		var uuid = $(this).data("uuid");
		console.log(uuid);

		infoWindows[uuid].open(map, markers[uuid]);
	});

	$(".team-item").click(function(e){
		var uuid = $(this).data("uuid");
		teamInfoWindows[uuid].open(map, teams[uuid]);
	});
}

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 51.9, lng: 4.5},
		zoom: 10
	});

	getLocations();
	getTeamData();
	getRoute();
	setHandlers();

	setInterval(function(){
		getLocations();
	}, 2000);

	setInterval(function(){
		getTeamData();
	}, 60000);
}