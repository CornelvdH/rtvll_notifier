var map;
var markers = {};

var key = "AIzaSyAiAkLCM8AhwKaDXVMlLRr";

var teams = {};
var doorkomsten = {};

var infoWindows = {};
var teamInfoWindows = {};
var doorkomstInfoWindows = {};

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
					icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
					id: current.id
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
				 	teamInfoWindows[this.id].open(map, teams[this.id]);
				});
			}

			var windowContent = parseMessageBundle(messages.teams.window, current);

			$(".team-info").append(windowContent);
			setHandlers();
		}
	});
}

function getDoorkomsten(){
	$.get("locations/static/doorkomsten.json", function(data){
		
		$(".doorkomst-info").empty();

		for(var d in data){
			var current = data[d];
			var latLng = new google.maps.LatLng(current.lat, current.lng);

			if(current.id in doorkomsten){
				doorkomsten[current.id].setPosition(latLng);
			} else {
				doorkomsten[current.id] = new google.maps.Marker({
					position: latLng,
					map: map,
					title: current.name,
					icon: 'http://maps.google.com/mapfiles/ms/icons/'+current.color+'-dot.png',
					id: current.id
				});
			}
			var content = parseMessageBundle(messages.doorkomsten.popup, current);

			if(current.id in doorkomstInfoWindows){
				doorkomstInfoWindows[current.id].setPosition(latLng);
				doorkomstInfoWindows[current.id].setContent(content);
			} else {
				doorkomstInfoWindows[current.id] = new google.maps.InfoWindow({
					content: content
				}); 

				doorkomsten[current.id].addListener('click', function() {
					doorkomstInfoWindows[this.id].open(map, doorkomsten[this.id]);
				});
			}

			var windowContent = parseMessageBundle(messages.doorkomsten.window, current);

			$(".doorkomst-info").append(windowContent);
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
					icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
					id: current.device_id
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

				markers[current.device_id].addListener('click', function() {
					infoWindows[this.id].open(map, markers[this.id]);
				});
			}

			var windowContent = parseMessageBundle(messages.locations.window, current);
			
			$(".location-info").append(windowContent);

			if(window.centerItem == current.device_name){
				map.setCenter(latLng);
			}
			setHandlers();

		}

	});
}

function getVideos(){
	$.get("locations/getVideo.php", function(data){
		
		$(".video-info").empty();
		
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
					icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
					id: current.device_id
				});

			}
			// Fix speed notation.
			current.speed = Math.round(current.speed * 3.6);
			var content = parseMessageBundle(messages.videos.popup, current);
			
			if(current.device_id in infoWindows){
				infoWindows[current.device_id].setPosition(latLng);
				infoWindows[current.device_id].setContent(content);
			} else {
				infoWindows[current.device_id] = new google.maps.InfoWindow({
					content: content
				}); 

				markers[current.device_id].addListener('click', function() {
					infoWindows[this.id].open(map, markers[this.id]);
				});
			}

			var windowContent = parseMessageBundle(messages.videos.window, current);
			
			$(".video-info").append(windowContent);

			if(window.centerItem == current.device_name){
				map.setCenter(latLng);
			}
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
				strokeColor: "#184275",
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
		infoWindows[uuid].open(map, markers[uuid]);
	});

	$(".video-item").click(function(e){
		var uuid = $(this).data("uuid");
		infoWindows[uuid].open(map, markers[uuid]);
	});


	$(".team-item").click(function(e){
		var uuid = $(this).data("uuid");
		teamInfoWindows[uuid].open(map, teams[uuid]);
	});

	$(".doorkomst-item").click(function(e){
		var uuid = $(this).data("uuid");
		doorkomstInfoWindows[uuid].open(map, doorkomsten[uuid]);
	});

	
}

function initMap() {
	
	var zoom = 11;
	if(window.zoomLevel){
		zoom = window.zoomLevel;
	}

	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 51.733225, lng: 4.529246},
		zoom: zoom
	});

	getLocations();
	getVideos();
	getTeamData();
	getRoute();
	getDoorkomsten();
	setHandlers();

	setInterval(function(){
		getLocations();
	}, 2000);

	setInterval(function(){
		getTeamData();
	}, 60000);

	$(".icon-container").click(function(e){
		var itemContainer = "." + $(this).data("items") + "-info";
		var iconItem = this;
		$(itemContainer).slideToggle('slow', function() {
	        if ($(itemContainer).is(':hidden')){
	            $(iconItem).find("i").removeClass("fa-minus-square").addClass("fa-plus-square");
	        } else {
	            $(iconItem).find("i").removeClass("fa-plus-square").addClass("fa-minus-square");
	        }
	    });
	});

	$(".list-group").slideUp(0);
}