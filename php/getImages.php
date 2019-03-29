<?php
include ("../admin/assets/checkinput.php");
$conn = connect_to_db();
if(isset($_GET['path'])){
    $path = test_input($_GET['path']);
    if(is_numeric($path)){
        $pathNr = $path;
        $path = "";
    }else{
        $pathNr = "";
    }
}   else{
    $path = "";
}

class Bild{
    public $id;
    public $name;
    public $center;
    public $biskrivning;
    public $bild;
    public $storlek = 20;
    public $played = 0;
    public $isActive = false;
    public $ordning;
    public $artist;
    public $visits;
    

    public function __construct($row){

        $this->id = $row["id"];
        $this->name = $row["rubrik"];
        $this->center = ["lat"=> $row["lat"], "lng" => $row["lng"]];
        $this->biskrivning = htmlspecialchars_decode($row["biskrivning"]);
        $this->bild = $row["bild"];
        $this->ordning = $row["ordning"];
        $this->artist = $row["artist"];
        $this->visits = $row["visits"];
    }
}


/* Prepared statement, stage 1: prepare */
if (!($stmt = $conn->prepare("SELECT go_bilder.*, points_in_path.ordning, points_in_path.lng, points_in_path.lat, points_in_path.visited as visits, go_path.name, go_user.name as artist, go_path.visited as pathVisits FROM go_bilder, points_in_path, go_path, go_user WHERE points_in_path.path = go_path.id AND go_bilder.id = points_in_path.point AND go_bilder.agare = go_user.id AND (go_path.name = ? OR go_path.id =?)"))) {
     echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
}

$stmt->bind_param('si', $path, $pathNr);


if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}
if (!($res = $stmt->get_result())) {
    echo "Getting result set failed: (" . $stmt->errno . ") " . $stmt->error;
}

$bilder = [];
$artists = [];
$pathName = "";
$pathvisits;
if ($res->num_rows > 0) {
    // output data of each row
    while($row = $res->fetch_assoc()) {  
        // var_dump($row);
        // echo "<br>";
        $bilder[] =  new Bild($row);
        $artists[] = $row['artist'];
        $pathName = $row['name'];
        $pathvisits = $row['pathVisits'];
    }
}




$artists = array_unique($artists);
$return = [ 
    "pathName"=>$pathName, 
    "path"=> $bilder,
    "artists" => $artists,
    "points" => count($bilder),

];
$json2 = json_encode($return, JSON_UNESCAPED_UNICODE);

$json = json_encode($bilder, JSON_UNESCAPED_UNICODE);
$conn->close();
//print_r($json);
print_r($json2);


?>