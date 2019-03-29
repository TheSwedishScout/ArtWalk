    <?php
session_start();
// var_dump($_POST);
// var_dump($_FILES);
$uploads_dir = '../uploads';
if ($_FILES["bild"]["error"] == UPLOAD_ERR_OK) {
    $tmp_name = $_FILES["bild"]["tmp_name"];
    // basename() may prevent filesystem traversal attacks;
    $allowedTypes = array(IMAGETYPE_PNG, IMAGETYPE_JPEG, IMAGETYPE_GIF);
	$detectedType = exif_imagetype($_FILES['bild']['tmp_name']);
	$error = !in_array($detectedType, $allowedTypes);
    // further validation/sanitation of the filename may be appropriate
    if(!$error){
	    $name = basename($_FILES["bild"]["name"]);
        $moveTo = "$uploads_dir/$name";
        $file_explode = explode(".",$name);
        $name_no_ext = $file_explode[0];
        $file_ext = end($file_explode);
	    $moveToSmal = "$uploads_dir/$name_no_ext-MINI.png";
        $resized = resize_image($tmp_name,$file_ext, 1000, 1000 );
        
	    imagepng($resized, "../".$moveToSmal);
	    move_uploaded_file($tmp_name, "../".$moveTo);
	    
	    //echo "$moveTo";
    }else{
        $response = ["sucsses" => false, "error"=> "Filetype not suported. Please try an other file. exepted file types: jpg, png and gif"];        
        echo json_encode($response);
        die();
    }
}else{
    $response = ["sucsses" => false, "error"=> "Something hepend whit the image. Please try again"];        
    echo json_encode($response);
    die();
}

//Spara filens sökväg i sql databas tillsamans med lonLat Rubrik och text

  require './checkinput.php';
  $conn = connect_to_db();

  $rubrik = test_input($_POST["rubrik"]);
  $biskrivning = test_input($_POST["biskrivning"]);
  
  if(empty($rubrik) ){
    $response = ["sucsses" => false, "error"=> "Heading cannot be empty, add a name to image"];    
    echo json_encode($response);
    die();
  } 
  // $moveTo ->  filskökväg


	// "INSERT INTO `bilder` (`lat`, `lng`, `rubrik`, `biskrivning`, `bild`) VALUES ('58.439207', '11.293511', 'Havet', 'Beskrivning', 'IMG_9590-2.jpg');"


//
/*-------------------ORDNING-------------------*/
//UPDATE points_in_path SET ordning = ordning + 1 WHERE ordning >= ? AND path = ?


/* create a prepared statement */
if ($stmt = $conn->prepare("INSERT INTO `go_bilder` (`rubrik`, `biskrivning`, `bild`, `agare`) VALUES (?, ?, ?, ?)")) {

    /* bind parameters for markers */
    $stmt->bind_param("sssi", $rubrik, $biskrivning, $name, $_SESSION['user']['nr']);

    /* execute query */
    if($stmt->execute()){

        $response = ["sucsses" => true];

    }else{
        $response = ["sucsses" => false, "error"=> $stmt->error];        
    }

    echo json_encode($response);

    /* close statement */
    $stmt->close();
}

/* close connection */


$conn->close();


function resize_image($file, $file_ext, $w, $h, $crop=FALSE) {
    list($width, $height) = getimagesize($file);
    $r = $width / $height;
    if ($crop) {
        if ($width > $height) {
            $width = ceil($width-($width*abs($r-$w/$h)));
        } else {
            $height = ceil($height-($height*abs($r-$w/$h)));
        }
        $newwidth = $w;
        $newheight = $h;
    } else {
        if ($w/$h > $r) {
            $newwidth = $h*$r;
            $newheight = $h;
        } else {
            $newheight = $w/$r;
            $newwidth = $w;
        }
    }
    
    switch ($file_ext){
        case "jpg":
            $src = imagecreatefromjpeg($file);
            break;
        case "png":
            $src = imagecreatefrompng($file);
            break;
    }
    //var_dump($src);
    $dst = imagecreatetruecolor($newwidth, $newheight);
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

    return $dst;
}


?>