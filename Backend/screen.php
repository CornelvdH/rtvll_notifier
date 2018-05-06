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

      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

      <link rel="stylesheet" type="text/css" href="resources/general.css">
</head>
<body>
      <?php
      if(isset($_GET['mode']) && $_GET['mode'] == "nowplaying"){
      ?>
            <div class="container">
                  <div class="row">
                        <div class="col-md-12" id="nowplaying">
                              <h3><span></span></h3>
                        </div>
                  </div>
            </div>
            <script>
                  $(function(){
                        function getData(){
                              $.get("/screens/nowplaying.txt", function(data){
                                    $("#nowplaying span").text(data);
                              });
                        }

                        setInterval(function(){
                              getData();
                        }, 2000);

                        getData();
                  })
            </script>
      <?php
      }
      ?>

      <?php
      if(isset($_GET['mode']) && $_GET['mode'] == "map"){
      ?>
            <div class="container">
                  <div class="row">
                        <div class="col-md-12 no-float no-padding">
                              <div id="map"></div>
                        </div>
                  </div>
            </div>
            <script>
                  window.zoomLevel = 15;
                  window.centerItem = '<?php echo $_GET['centerItem']; ?>';
            </script>
            <script src="resources/messages.js"></script>
            <script src="resources/maps.js"></script>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAiAkLCM8AhwKaDXVMlLRr_yK075cK8yUw&callback=initMap" async defer></script>
      <?php
      }
      ?>
</body>
</html>