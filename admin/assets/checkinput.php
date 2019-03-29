<?php
function test_input($data) { //$data är värdet av det vi skriver i fälten
    //trim tar bort alla tomma tecken i början och slutet av strängen 
	$data = trim($data);
    // sätter \ framför fnuttar och specialtecken för att ta bort funktionalitete
	$data = stripslashes($data);
    //omvandlar åäö och andra specialtecken till säkra html tecken
	$data = htmlspecialchars($data);

	$conn = connect_to_db();
    //gör exakt som sql
	$data = mysqli_real_escape_string ( $conn , $data );

	$conn->close();
	return $data;
}
function connect_to_db(){
	include_once("config.php");
	$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT) or die(mysqli_error());

	if ($conn->connect_error) {

		die("Connection failed: " . $conn->connect_error);

	} 

	$sql_main = "SET NAMES 'utf8'";
	$result = $conn->query($sql_main);
	//mysqli::set_charset('utf8'); // when using mysqli

	/*$sql_second ="CHARSET 'utf8'";
	$result = $conn->query($sql_second);
	//sets utf-8 as CHARSET in mySQL§
	/* change character set to utf8 */
	if (!mysqli_set_charset($conn, "utf8")) {
	    printf("Error loading character set utf8: %s\n", mysqli_error($conn));
	}
	return $conn;
}
?>