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
</head>
<body>
      <div id="nowplaying">
            <h4><strong>Nu op de radio: </strong><br><span></span></h4>
      </div>

      <div id="tweet">
            <h4><strong class="title">Twitter mee @RTV_L: </strong><br><span></span></h4>
      </div>

      <script>
            $(function(){
                  var i = -1;

                  function getNowPlaying(){
                        $.get("/screens/nowplaying.txt", function(data){
                              $("#nowplaying span").text(data);
                        });
                  }

                  function getData(){
                        $.get("/screens/tweets.php", function(data){
                              $("#tweet").hide();
                              $("#nowplaying").hide();
                              
                              i++;
                              if(i > data.length - 1){
                                    i = -1;
                                    getNowPlaying();
                              } else {
                                    $("#tweet span").html(data[i].html);
                                    $("#tweet .title").html(data[i].content);
                              }
                              
                              if(i == -1){
                                    $("#nowplaying").slideDown("slow");
                                    $("#tweet").hide("slow");
                              } else {
                                    $("#nowplaying").hide("slow");
                                    $("#tweet").slideDown("slow");
                              }
                              
                        });
                  }

                  setInterval(function(){
                        getData();
                  }, 7500);
                        
                  $("#nowplaying").show();
                  $("#tweet").hide();
                  getNowPlaying();


            })
      </script>

</body>
</html>