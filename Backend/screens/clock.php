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
      <h3 id="clock"></h3>

      <script>
            

            function startTime() {
                  var today = new Date();
                  var h = today.getHours();
                  var m = today.getMinutes();
                  var s = today.getSeconds();
                  m = checkTime(m);
                  s = checkTime(s);
                  $("#clock").text(h + ":" + m + ":" + s);
                  var t = setTimeout(startTime, 500);
            }
            function checkTime(i) {
                  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
                  return i;
            }

            $(function(){
                  startTime();
            });
</script>

</body>
</html>