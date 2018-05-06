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
      
      <div class="container" id="color">
            
      </div>

      <div class="container text-center" id="absence">
            <div class="row">
                  <div class="col-md-12">
                        <img src="absence.png" class="img-responsive">
                  </div>
            </div>
            
      </div>
      
      <script>

            function getScreenType(){
                  var d = new Date();
                  var h = d.getHours();
                  var itemType = "";
                  if(h < 7 || h >= 22){
                        itemType = "absence";
                  } else {
                        itemType = "color";
                  }
                  $(".container").hide();
                  $("#" + itemType).show();
            }      
      
            $(function(){

                  setInterval(function(){
                        getScreenType();
                  }, 1000);

                  getScreenType();
            })
      </script>

</body>
</html>