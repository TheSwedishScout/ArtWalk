<?php
//$password = $_POST['password'];
//$username = $_POST['username'];
include ("checkinput.php");


session_start();

if (!isset($_SESSION['user'])){
//    session_unset();
    /*$pre_page = test_input($_POST['page']);  FIXAAA */

    $username = test_input($_POST['username']);
    $password = test_input($_POST['password']);
    
    $sql = "SELECT password, user_lvl, name, username, id FROM go_user WHERE username = ? OR email = ?";

    $conn = connect_to_db();

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $username);
    $stmt->execute();
    $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            // output data of each row
            $row = $result->fetch_assoc();
            $password_hashed = $row['password'];
            
            if (password_verify($password, $password_hashed)) {


                $_SESSION['user']['id'] = $row['username'];
                $_SESSION['user']['lvl'] = $row['user_lvl'];
                $_SESSION['user']['name'] = $row['name'];
                $_SESSION['user']['nr'] = $row['id'];
                $_SESSION['user']['ip'] = $_SERVER['REMOTE_ADDR']; // SÄKERTHETs grej så att ingen kan komma in på samma session!! genom att spara ipadressen i sessionen som är aktiv,
                //måste kollas på sidorna att den stämmer överens med den aktiva ip adressen
                /*if ($_SESSION['user']['ip'] !== $_SERVER['REMOTE_ADDR']){
                    SPARKA UT JÄKELN
                }*/
                //du har lyckats och användarnamn skrivs ut och skickar med anv.namn och user lvl
                echo (json_encode(['sucsess'=> true, 'user_name' => $row['name'], 'user_lvl' => $row['user_lvl']]));
            } else {
                echo (json_encode(['sucsess'=> false, 'error' =>"username or password incorrect"]));
            }
            
        } else {
                echo (json_encode(['sucsess'=> false, 'error' =>"username or password incorrect"]));
        }
        $conn->close();
}else {
    echo (json_encode(['sucsess'=> false, 'error' =>"already signd in"]));
}
?>