<?php
$host = "sqlXXX.epizy.com";  // Your InfinityFree MySQL Host (change with your host)
$user = "your_db_username";  // Your MySQL Username (change with your username)
$pass = "your_db_password";  // Your MySQL Password (change with your password)
$dbname = "your_db_name";    // Your MySQL Database Name (change with your database name)

$conn = new mysqli($host, $user, $pass, $dbname);

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST["name"]);
    $e_id = htmlspecialchars($_POST["e_id"]);
    $a_name = htmlspecialchars($_POST["a_name"]);

    // Prepare the SQL query
    $stmt = $conn->prepare("INSERT INTO anime_requests (name, e_id, a_name) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $e_id, $a_name);
    
    // Execute the query and handle success/error
    if ($stmt->execute()) {
        echo "Anime request submitted successfully!";
    } else {
        echo "Error: " . $stmt->error;  // Show error if insertion fails
    }

    $stmt->close();
} else {
    echo "Invalid request method.";  // Handle invalid request method (GET instead of POST)
}

$conn->close();
?>
