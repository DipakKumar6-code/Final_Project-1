<?php
$insert = false;
$server = "localhost";
$username = "root";
$password = ""; 

$conn = mysqli_connect($server, $username, $password);

if (!$conn) {
    die("Failed to connect: " . mysqli_connect_error());
}

$diploma = '';
$year = '';
$impSkill = '';
$experience = '';
$terms = 0;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $diploma = $_POST['diploma'] ?? '';
    $year = $_POST['gradYear'] ?? '';
    $impSkill = $_POST['requiredSkill'] ?? '';
    $experience = $_POST['expYear'] ?? '';
    $terms = isset($_POST['myTerms']) ? 1 : 0;

    $sql = "INSERT INTO `Eligibility Checker` . `candidate` (`Diploma`, `Year`, `Experience`, `Skill`, `Terms`) VALUES ('$diploma', '$year', '$experience', '$impSkill', '$terms');";

    if ($conn->query($sql) == true) {
        $insert = true;
    } else {
        echo "ERROR: $sql <br> " . $conn->error;
    }
}

// Check eligibility criteria
$eligibilityCriteria = array($diploma, $year, $experience, $impSkill, $terms);
$candRequirement = array("CP", "2018", "6", "Python", "1");

$hireCand = false;

for ($i = 0; $i < 4; $i++) {
    if ($eligibilityCriteria[$i] == $candRequirement[0] && $eligibilityCriteria[$i + 1] == $candRequirement[1] && $eligibilityCriteria[$i + 2] == $candRequirement[2] && $eligibilityCriteria[$i + 3] == $candRequirement[3] && $eligibilityCriteria[$i + 4] == $candRequirement[4]) {
        $hireCand = true;
        break;
    }
}

if ($hireCand) {
    echo "Congratulations! You are eligible for the job, your interview is scheduled for 1 week from now!";
} else {
    echo "We are sorry, we have moved on with other candidates at this time.";
}

// Close connection
mysqli_close($conn);
?>
