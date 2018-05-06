<!DOCTYPE html>
<html>
<head>
	<title>RTV-LL Notifier</title>
	<meta name="viewport" content="initial-scale=1.0">
	<meta charset="utf-8">
	<script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
      <!-- Latest compiled and minified CSS -->
      <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
      <link rel="stylesheet" type="text/css" href="resources/bootswatch-paper.min.css">
	  <link href="http://vjs.zencdn.net/6.6.3/video-js.css" rel="stylesheet">


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
                        <h4>
                        <span class="icon-container" data-items="location">
                              <i class="fa fa-plus-square" aria-hidden="true"></i>
                              RTV-LL Locaties
                        </span><img src="http://maps.google.com/mapfiles/ms/icons/red-dot.png"></h4>
                        <p>Locaties die hier getoond worden zijn gekoppeld aan een reporter van RTV Lansingerland.</p>
                        <div class="location-info list-group">
                        </div>

			<hr>
                        <h4>
                        <span class="icon-container" data-items="video">
                              <i class="fa fa-plus-square" aria-hidden="true"></i>
			      Video's onderweg
                        </span><img src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"></h4>
                        <p>Onze reporters uploaden video's. Kijk in deze lijst om te zien wat er op de route gebeurt.</p>
                        <div class="video-info list-group">
                        </div>


                        <hr>
                        <h4>
                        <span class="icon-container" data-items="doorkomst">
                              <i class="fa fa-plus-square" aria-hidden="true"></i>
                              Doorkomsten
                        </span><img src="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"></h4>
                        <p>Doorkomsten die hier getoond worden zijn gekoppeld aan een doorkomst van de Roparun-organisatie.</p>
                        <div class="doorkomst-info list-group">
                        </div>

                        <hr>
                        <h4>
                        <span class="icon-container" data-items="team">
                              <i class="fa fa-plus-square" aria-hidden="true"></i>
                              RopaRun Teams
                        </span><img src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"></h4>
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
      <script src="http://vjs.zencdn.net/6.6.3/video.js"></script>
</body>
</html>