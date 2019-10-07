<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Max-Age: 1000');
$host = "localhost";
$username = "u553761671_root";
$password = "password";
$database = "u553761671_attendance";
error_reporting(0);
$conn = mysqli_connect($host, $username, $password, $database);
if($conn == false)
{
	$response = array();
	$response['error'] = "true";
	$response['result'] = "connection not established!";
	echo json_encode($response);
	die();
}
$username = $_POST['username'];
$password = $_POST['password'];
$query = "SELECT `session` FROM `admin` WHERE username = '$username' and password = '$password';";
$result = mysqli_query($conn, $query);
if(mysqli_num_rows($result) == 1)
{
    if($result == 1)
    {
        $response = array();
	    $response['error'] = "true";
	    $response['result'] = "Already logged In Somewhere";
	    echo json_encode($response);
	    die();
    }
    $query = "UPDATE `admin` SET `session`= 1 WHERE username = '$username'";
    $result = mysqli_query($conn, $query);
    $response = array();
	$response['error'] = "false";
	$response['result'] = "login successful";
	echo json_encode($response);
	die();
}
else
{
    $response['error'] = "true";
	$response['result'] = "login unsuccessful";
	echo json_encode($response);
	die();
}

