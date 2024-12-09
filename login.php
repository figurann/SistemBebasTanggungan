<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  try {
    $user = $_POST["username"];
    $pass = $_POST["password"];

    // Detailed logging
    error_log("Login attempt - Username: $user, Password: $pass");

    // Use a query to check exact matching
    $stmt = sqlsrv_prepare(
      $conn,
      "SELECT * FROM users WHERE username = ? AND password = ?",
      array(&$user, &$pass)
    );

    if ($stmt === false) {
      error_log("Prepare statement error: " . print_r(sqlsrv_errors(), true));
      throw new Exception("SQL Prepare Error");
    }

    $result = sqlsrv_execute($stmt);

    if ($result === false) {
      error_log("Execute statement error: " . print_r(sqlsrv_errors(), true));
      throw new Exception("Query execution failed");
    }

    // Fetch all matching rows
    $rows = [];
    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
      $rows[] = $row;
    }

    $rowCount = count($rows);

    error_log("Query result - Rows found: $rowCount");

    if ($rowCount > 0) {
      echo json_encode([
        "success" => true,
        "message" => "Login berhasil",
        "role" => $rows[0]["role"],
        "token" => bin2hex(random_bytes(16))
      ]);
    } else {
      error_log("No matching user found");
      echo json_encode([
        "success" => false,
        "message" => "Username atau password salah",
        "details" => "No user match in database"
      ]);
    }
  } catch (Exception $e) {
    error_log("Kesalahan server: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
      "success" => false,
      "message" => "Kesalahan server: " . $e->getMessage()
    ]);
  }
} else {
  http_response_code(405);
  echo json_encode(["success" => false, "message" => "Metode tidak valid"]);
}
sqlsrv_close($conn);
