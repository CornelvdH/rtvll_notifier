<!DOCTYPE html>
<html>
<head>
	<title>RTV-LL Notifier</title>
	<meta name="viewport" content="initial-scale=1.0">
	<meta charset="utf-8">
	<script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
      <!-- Latest compiled and minified CSS -->
      <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> -->
      <link rel="stylesheet" type="text/css" href="resources/bootswatch-paper.min.css">

      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

      <link rel="stylesheet" type="text/css" href="resources/general.css">
</head>
<body>
      <div class="container">
            <div class="row">
                  <div class="col-md-3 no-float visible-md visible-lg">
                        <h3>RTV-LL Notifier</h3>
                        <p>Op dit scherm zie je de belangrijkste info over de RopaRun binnenkomen. </p>

                        <hr>
                        <h4>RTV-LL Locaties</h4>
                        <p>Locaties die hieronder getoond worden zijn gekoppeld aan een reporter van RTV Lansingerland.</p>
                        <div class="location-info list-group">
                        </div>

                        <hr>
                        <h4>RopaRun Teams</h4>
                        <p>De teams hieronder zijn gefilterd op de teams die wij volgen.</p>
                        <div class="team-info list-group">
                        </div>
                  </div>
                  <div class="col-md-9 no-float no-padding">
                        <div id="map"></div>
                  </div>
            </div>
      </div>
      <script src="resources/messages.js"></script>
      <script src="resources/maps.js"></script>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAiAkLCM8AhwKaDXVMlLRr_yK075cK8yUw&callback=initMap" async defer></script>
</body>
</html>