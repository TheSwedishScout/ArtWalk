<?php
    session_start();
	require 'checkinput.php';
	$conn = connect_to_db();
	$sql = "SELECT id, rubrik, bild FROM  `go_bilder` WHERE agare =? ";


    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $_SESSION['user']['nr']);
    $stmt->execute();

    $stmt->bind_result($id, $rubrik, $bild);

    $result = [];
	$bild1 = null;
    while ($stmt->fetch()) {
    	if ($bild1 == null) {
    		$bild1 = $bild;
    	}
        $row = ["id"=> $id, "bild" => $bild, "rubrik"=>$rubrik];
        $result[]= $row;
    	
        /*<option value="<?php echo $id; ?>" data-bild="<?= $bild; ?>">		

            echo $rubrik;*/
    }
    echo json_encode($result);
 ?>