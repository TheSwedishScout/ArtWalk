

<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta charset="utf-8">
	<title>Image Walk</title>
	<link rel="stylesheet" type="text/css" href="css/null.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="stylesheet" type="text/css" href="css/header.css">
	<link rel="stylesheet" type="text/css" href="css/path-display.css">
	<script>
	    localStorage.removeItem("visited");
	    
	</script>
</head>
<body>
<?php
require('admin/assets/checkinput.php');
$conn = connect_to_db();

if(isset($_GET['user'])){
	$user = test_input($_GET['user']);
	$sql = "SELECT go_path.id, go_path.name, go_path.distance, DATE_FORMAT(go_path.time, '%H:%i') as time, count(*) as positions, go_user.username as username, go_user.id as userid, go_bilder.bild, points_in_path.lat, points_in_path.lng FROM `go_path`, points_in_path, go_user, go_bilder WHERE go_path.id = points_in_path.path AND go_path.user = go_user.id and points_in_path.point = go_bilder.id AND (go_user.id = $user OR go_user.username = $user) GROUP BY points_in_path.path";
}

?>
<div id="wrapper">
		<header>
			<div class="header-content">
			<a href="index.php">
				<img src="images/apple-touch-icon-72x72.png" id="logo">
				<h1>Image walk</h1>
			</a>
			<!-- <nav>
				<ul>
					<li>
						<a href="">kontakt</a>	
					</li>
					<li>
						<a href="">alla bilder</a>	
					</li>
					<li>
						<a href="">om</a>	
					</li>
					<li>
						<a href="">säkert något</a>	
					</li>
				</ul>
			</nav> -->
			</div>
		</header>
		<main>
			<h2>Promenader</h2>
			<ul class="paths">
				<?php
				
				if ($result = $conn->query($sql)) {
					/* fetch associative array */
					while ($row = $result->fetch_assoc()) {
						?>
						<li class ="path path-<?=$row['id']?>">
							<a href="go.php?path=<?=$row['id']?>">
								<h2 class="path-name"><?=$row['name'];?></h2>
								<figure>
									<img class="path-img" src="uploads/<?=$row['bild'];?>">
								</figure>
							</a>
							<div class="path-info">
								<table>
									<tr>
										<td>Antal bilder: </td>
										<td><?=$row['positions']?></td>
									</tr>
									<?php if($row['distance'] !==  null) :?>
									<tr>
										<td>Längd: </td>
										<td> ca <?=$row['distance']?> km</td>
									</tr>
									<?php 
										endif;
										if($row['time'] !==  null) :
										?>
									<tr>
										<td>Tid: </td>
										<td> ca <?= $row['time']?></td>
									</tr>
									<?php
									endif;
									if($row['lng'] !==  null) :
										?>
									<tr>
										<td>Första position: </td>
										<td><a href="https://www.google.se/maps/dir//<?=$row['lat']?>,<?=$row['lng'];?>">
											<p>Hitta till<img class="directions" src="images/baseline_directions_black_24dp.png" /></p>
										</a></td>
									</tr>
									<?php
									endif;
									?>
								</table>
								<a class="pub" href="user.php?user=<?= $row['userid'];?>"><?= $row['username'] ?></a>
							</div>
						</li>
						<?php
					}
				}

				?>
			</ul>
		</main>
		<footer></footer>
	</div>

</body>
</html>
<?php

$conn->close();
?>