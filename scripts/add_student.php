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
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$id = $_POST['id'];
$password = $_POST['password'];
$semester = $_POST['semester'];
$query = "SELECT `firstname` FROM `student` WHERE id = '$id';";
$result = mysqli_query($conn, $query);
if(mysqli_num_rows($result) == 1)
{
    $response = array();
	$response['error'] = "true";
	$response['result'] = "Already Registered";
	echo json_encode($response);
	die();
}
else
{
    $query = "INSERT INTO `student` (`firstname`, `lastname`, `id`, `password`, `semester`) VALUES ('$firstname', '$lastname', '$id', '$password', '$semester');";
    $result = mysqli_query($conn, $query);
    $response['error'] = "false";
	$response['result'] = "Registration Successfull";
	echo json_encode($response);
	die();
}

