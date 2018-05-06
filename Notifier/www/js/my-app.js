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


myApp.onPageInit('callsheet', function(page) {
    var uploader = {};

    uploader.creds = {
        bucket: 'upload-video-platform',
        access_key: 'AKIAJFYVFGCEQ7KJEURQ',
        secret_key: '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'
    };

    uploader.urlFormat = "https://s3.eu-west-3.amazonaws.com/upload-video-platform/";

    uploader.createVideoEntry = function() {
 
        var url = uploader.urlFormat + encodeURIComponent(uploader.file.name.replace(/ /g,''));
        navigator.geolocation.getCurrentPosition(function(position) {
            var item = createPostObject(position.coords);
            item.type = "video";
            item.url = url;
            item.device_id = uploader.file.name;
            post(item);

        }, function(){

        });
    };

    uploader.percentage = 0;

    uploader.upload = function() {
        console.log(uploader.file);
        // Configure The S3 Object 
        AWS.config.update({ accessKeyId: uploader.creds.access_key, secretAccessKey: uploader.creds.secret_key });
        AWS.config.region = 'eu-west-3';
        var bucket = new AWS.S3({ params: { Bucket: uploader.creds.bucket } });

        if(uploader.file) {
            var params = { Key: uploader.file.name, ContentType: uploader.file.type, Body: uploader.file };

            bucket.putObject(params, function(err, data) {
                if(err) {
                    // There Was An Error With Your S3 Config
                    alert(err.message);
                    return false;
                } else {
                    uploader.createVideoEntry();
                }
            }).on('httpUploadProgress',function(progress) {
                // Log Progress Information
                uploader.percentage = Math.round(progress.loaded / progress.total * 100);
                console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
            });
        }
        else {
            // No File Selected
            alert('No File Selected');
        }
    }

    $("#btn-start-upload").click(function(e){
        uploader.file = $("input[name='file']").get(0).files[0];
        uploader.upload();
    });

    $("#file-1").change(function(e){
        $(".inputfile label").text("Bestand geselecteerd");
    });

    setInterval(function(){
        $(".progress .percent").text(uploader.percentage);
        if(uploader.percentage == 100){
            $(".complete").show();
        }
    }, 500);
});