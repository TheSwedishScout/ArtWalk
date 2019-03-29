<?php
	require_once 'assets/checkinput.php';
	$conn = connect_to_db();
	$sql = "SELECT id, name FROM  `go_path` WHERE user =? ";


    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $_SESSION['user']['nr']);
    $stmt->execute();

    $stmt->bind_result($id, $name);
?>
<label>
	Banna: 
<select id="addtopath-path" name="path">
	
<?php
    while ($stmt->fetch()) {
    	
    	?>
    	<option value="<?php echo $id; ?>">		
	    	<?php
	    	echo $name;
	    	?>
    	</option>
<?php
    }
 ?>
</select>
</label>
