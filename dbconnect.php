<?php
$mysql_host = "mysql.2freehosting.com";
$mysql_database = "u611530530_out";
$mysql_user = "u611530530_admin";
$mysql_password = "Swagaga11";

echo $_POST['val1'];

try {
    $conn = new PDO("mysql:host=$mysql_host;dbname=$mysql_database", $mysql_user, $mysql_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully\r\n";
    }
catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage() . "\n";
    }
try {
	$conn->query('INSERT INTO tempTable VALUES ("hi",1,32)');
	$stmt = $conn->query('SELECT * FROM tempTable');
	$row_count = $stmt->rowCount();
	echo $row_count.' rows selected';
}
catch(PDOException $e)
	{	
	echo "Query failed: " . $e->getMessage();
	}
?>