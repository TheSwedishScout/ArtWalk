<?php
// check if is loged in via sessions
// else redirect to login

session_start();
if(!isset($_SESSION['user'])){
  //header('location: index.php');
  var_dump($_SESSION);
  echo("no session");
  ?>
  <a href="index.php">Log in</a>
  <?php
  exit();
}
if ($_SESSION['user']['ip'] !== $_SERVER['REMOTE_ADDR']){
	//header('location: assets/logOut.php');
	
	echo("ip no match");
	exit();
}
if ($_SESSION['user']["lvl"] < 2) {
	echo "Not an editorial user";
	?>
	request edit rights, send a mail to max@timje.se
	 <?php
	exit();
}
//var_dump($_SESSION);
?>
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<title>Rudu Go</title>
	<link rel="stylesheet" type="text/css" href="../css/admin.css">
	<script type="text/javascript" src="../js/functions.js"></script>
	<script type="text/javascript" src="js/admin.js"></script>
	<script src="//cdn.ckeditor.com/4.11.1/basic/ckeditor.js"></script>
</head>
<body>
	<div id="wrapper">
	
	<div>
		<form id="addNewImage">
			<h2>Lägg till ny bild</h2>
			<label>
				Bildens namn:
				<input type="text" id="rubrik" name="rubrik">
			</label>
			<label>
				Ny bild: 
				<input type="file" id="imageUpload" name="bild">
			</label>
			<label>
				Biskrivning till bild:
				<textarea name="biskrivning" id="text"></textarea>
			</label>
			<input type="submit" name="" value="Ladda upp bild">

		</form>
		<form id="addToPath">
			<h2>Lägg till bild på bana</h2>
			<label>
				Välj bild:
				<select id="addtopath-bild"></select>
			 	<img id="prewiev" src="" width="50px" height="auto">
			</label>
			 <?php
				require 'assets/select_path.php'; //make dynamic with js
			 ?>
			<label>
				Ordning i rundan: 
			 	<input type="number" name="ordning" id="addtopath-ordning">
			</label>
			<label>
				Latitude: (tryck på kartan för att markera position)
				<input type="number" step="0.0000000000000001" class="lat" name="lat" id="addtopath-lat">
			</label>
			<label>
				Longitude:
				<input type="number" step="0.0000000000000001" class="lon" name="lon" id="addtopath-lng">
			</label>
			<input type="submit" name="" value="Lägg till pungt">
		</form>
		<form action="" id="addPath">
			<h2>Skapa ny bana</h2>
			<label>
				Banans namn:
				<input type="text" id="newPathName" name="name" placeholder="Banans namn">
			</label>
			<input type="submit" value="Skapa">
			
			<!-- 	
			<label>
				Latitude:
				<input type="number" step="0.0000000000000001" class="lat" name="lat">
			</label>
			<label>
				Longitude:
				<input type="number" step="0.0000000000000001" class="lon" name="lon">
			</label>
			 -->
		</form>
		
		<a href="assets/logOut.php">Log out</a>
	</div>
	<div id="mapAria">
		<div id="map"></div>
		<div class="mapControlls">
			<a href="" id="satellite">Satellite</a>
			<a href="" id="road">Streat</a>
		</div>
	</div>
	</div>
	<script async defer
   		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBMIfBnswdvPL4YEB017t2LCoCr8YRYisY&region=JP&callback=initMap">
    </script>
</body>
</html>