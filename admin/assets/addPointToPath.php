<?php 
session_start();

if ($_SESSION['user']["lvl"] >= 2) {
    require './checkinput.php';

     $path = (int)test_input($_POST["path"]);
     $point = (int)test_input($_POST["bild"]);
     $ordning = test_input($_POST["ordning"]);
     $lng = test_input($_POST["lng"]);
     $lat = test_input($_POST["lat"]);

    //check ordning != value in DB


    $sql = "INSERT INTO `points_in_path` (`path`, `point`, `ordning`, `lng`, `lat`) VALUES (?, ?, ?, ?, ?)";
      $conn = connect_to_db();
    if ($stmt = $conn->prepare($sql)) {

        /* bind parameters for markers */
        $stmt->bind_param("iiiss", $path, $point, $ordning, $lng, $lat);

        /* execute query */
        $stmt->execute();
        
        if ($stmt->error) {

     		printf('{"result": false, "error": "%s"}', $stmt->error);
        	
        }else{
        	printf('{"result": true}');
        }
        /* close statement */
        
        $stmt->close();
    }
    $conn->close();
}

?>