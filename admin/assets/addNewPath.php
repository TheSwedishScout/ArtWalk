<?php 
session_start();


if ($_SESSION['user']["lvl"] >= 2) {

	include 'checkinput.php';

	$path = test_input($_POST["path"]);
	//var_dump($path);

	$sql = "INSERT INTO `go_path` (`name`, `user`) VALUES (?, ?);";
	  $conn = connect_to_db();
	if ($stmt = $conn->prepare($sql)) {

	    /* bind parameters for markers */
	    $stmt->bind_param("ss", $path, $_SESSION['user']['nr']);

	    /* execute query */
	    if ($stmt->execute()){
	    	printf('{"result": true}');
	    
	    }else{
	 		printf('{"result": false, "error": "%s"}', $stmt->error);
	    }
	    /* close statement */
	    
	    $stmt->close();
	}
	$conn->close();
}


?>