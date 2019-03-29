<!DOCTYPE html>
<html>
  <head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	
	<meta charset="utf-8">
	<title>Image Walk</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="viewport" content="width=device-width, user-scalable=no" />
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="theme-color" content="#f6fb00">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<meta name="application-name" content="Image Walk">
	<meta name="apple-mobile-web-app-title" content="Image Walk">
	
	<link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
	<link rel="apple-touch-icon" sizes="57x57" href="images/apple-touch-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="images/apple-touch-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="images/apple-touch-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="images/apple-touch-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="images/apple-touch-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="images/apple-touch-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon-180x180.png">
	<link rel="icon" type="image/png" href="images/favicon-16x16.png" sizes="16x16">
	<link rel="icon" type="image/png" href="images/favicon-32x32.png" sizes="32x32">
	<link rel="icon" type="image/png" href="images/favicon-96x96.png" sizes="96x96">
	<link rel="icon" type="image/png" href="images/android-chrome-192x192.png" sizes="192x192">
	<meta name="msapplication-square70x70logo" content="images/smalltile.png" />
	<meta name="msapplication-square150x150logo" content="images/mediumtile.png" />
	<meta name="msapplication-wide310x150logo" content="images/widetile.png" />
	<meta name="msapplication-square310x310logo" content="images/largetile.png" />

	
	<!-- Code from: https://github.com/timruffles/ios-html5-drag-drop-shim -->
	<!-- <script type="text/javascript" src="js/ios-drag-drop.js"></script> -->
	<!--http://www.movable-type.co.uk/scripts/latlong.html-->
	
	<link rel="stylesheet" type="text/css" href="css/go-style.css">

	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
		integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
		crossorigin=""/>
	<script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"
		integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA=="
		crossorigin=""></script>

  </head>
  <body>
  	<header>
		<a href="index.php">
			<img src="images/apple-touch-icon-72x72.png" id="logo">
		</a>
		<h2><a href="./">Image walk</a> - </h2><h1 id="pathname">pathname</h1>
	</header>
	<div id="wrapper">
		
	<div id="beenTo"></div>
	<!--<button id="get_location">start</button>-->
	<div id="map"></div>
	<div id="game"></div>
	
	<script src="js/functions.js"></script>
	<script src="js/positions2.js"></script>
	</div>
	<!-- <script async defer
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBMIfBnswdvPL4YEB017t2LCoCr8YRYisY&region=JP&callback=initMap">
	</script> -->
  </body>
</html>