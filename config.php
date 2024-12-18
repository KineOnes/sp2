<?php
// config.php - Database Configuration

$host = "localhost";
$user = "root"; // Your database username
$password = ""; // Your database password
$database = "auction_platform"; // Database name

// Create a connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Database connected successfully!";
?>
