<?php
$mysql_host = "mysql.2freehosting.com";
$mysql_database = "u611530530_out";
$mysql_user = "u611530530_admin";
$mysql_password = "Swagaga11";

$table = $_POST['table'];

try 
{
    $conn = new PDO("mysql:host=$mysql_host;dbname=$mysql_database", $mysql_user, $mysql_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully\r\n";
}
catch(PDOException $e)
{
    echo "Connection failed: " . $e->getMessage() . "\n";
}
try
{
	//Gotta hand craft the insert statements here. wheee
	//But, at least, I should only need one type of statement per table
}
catch(PDOException $e)
{
	
}
?>