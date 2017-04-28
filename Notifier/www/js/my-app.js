// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
     // Because we want to use dynamic navbar, we need to enable it for this view:
     material: true
 });

var i = 0;

var map = null;
var marker = null;

var mapCreated = false;

var deviceKey = "deviceName";

function getDeviceName(){
    var storage = window.localStorage;
    var value = storage.getItem(deviceKey);

    return value;
}

function setDeviceName(value){
    var storage = window.localStorage;
    storage.setItem(deviceKey, value);
}

function createMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.985249, lng: 4.499812},
        zoom: 15
    });

    $.ajax({
        type: "GET",
        url: "http://app.rtvlansingerland.nl/resources/route.gpx",
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
                path: points,
                strokeColor: "#FF00AA",
                strokeOpacity: .7,
                strokeWeight: 4
            });
            poly.setMap(map);
            // fit bounds to track
            //map.fitBounds(bounds);
        }
    });

    mapCreated = true;
}

function createPostObject(item){
    
    item.number = i;
    item.type = "live";
    i++;

    item.last_modified = new Date().toLocaleString();
    item.device_id = window.device.uuid;

    item.device_name = getDeviceName();

    return item;
}

function post(item){
    $.post("http://app.rtvlansingerland.nl/post.php", item);
}

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");

    function onSuccess(position) {

        var item = createPostObject(position.coords);
        var centerId = item.latitude + ', ' + item.longitude;

        if(mapCreated){
            $(".device_name").text(item.device_name);
            $(".updated_time").text(item.last_modified);
            $(".speed").text(Math.round(item.speed * 3.6) + " km/h");
            
            var coords = {lat: item.latitude, lng: item.longitude};
            var latlng = new google.maps.LatLng(item.latitude, item.longitude);

            map.setCenter(coords);

            if(marker == null){
                marker = new google.maps.Marker({
                    position: coords,
                    map: map
                });    
            } else {
                marker.setPosition(latlng);
            }

        }

        post(item);
    }

    function onError(data){

    }

    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('map', function (page) {
    map = null;
    marker = null;

    createMap();
});

myApp.onPageInit('device-name', function (page) {
    
    $(".device-name-input").val(getDeviceName());
    $(".device-name-input").change(function(e){
        setDeviceName($(this).val());
    });
});
