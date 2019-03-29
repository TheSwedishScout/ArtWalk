<?php 
include 'checkinput.php'; 

$response = ['sucsses' => 'FALSE'];

//echo "systemet kollar om du är inloggad.<br>";

if (!isset($_SESSION['user'])){
    //har vi ingen användare inloggad? skapar variabler av fälten fyller i.
	$nick = test_input($_POST['username']);
	$password = test_input($_POST['password']);
	$name = test_input($_POST['name']);
	$email = test_input($_POST['email']);

	/*kollar så att inte något fält är tomt*/

	if (!empty($nick) || !empty($password) || !empty($name) || !empty($email) && isEmail($email)){ //Något fält är tomt
		$conn = connect_to_db();
		$options = [
            //lösenordssäkerhet. hur mycket processkraft ska gå åt för att hasha
		'cost' => 10
		];
        //hashar lösen med en bcrypt
		$password_hashed = password_hash($password, PASSWORD_BCRYPT, $options);
		unset($password);

		//insertinge values into mysqli server
		$stmt = $conn->prepare("INSERT INTO go_user (name, username, password, email) VALUES (?,?,?,?)");
	    $stmt->bind_param("ssss", $name, $nick, $password_hashed, $email);

		if ($stmt->execute() === TRUE) { //successfully insertded values to database

			$response = ['sucsess' => true];
			// Mail the activation code to the user
		}else{
			$response['error'] = $stmt->error;
			
		}
	}else{
		$response['error'] = 'something is empty';
	}
}else{
	$response['error'] = 'session is set';
}
echo (json_encode($response));
?>

