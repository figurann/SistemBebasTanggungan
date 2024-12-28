<?php
session_start();
include '../config/config.php';

// Fungsi untuk menangani login
function handleLogin($conn, $user, $pass)
{
  try {
    // Query untuk mendapatkan informasi pengguna
    $query = "SELECT 
                u.username, 
                u.password, 
                u.level as role,
                COALESCE(m.nama, a.nama) as nama,
                m.nim as nim  /* Tambahan kolom nim */
            FROM pengguna.[User] u
            LEFT JOIN pengguna.Mahasiswa m ON u.username = m.username
            LEFT JOIN pengguna.Admin a ON u.username = a.username
            WHERE u.username = ?";

    $stmt = sqlsrv_prepare($conn, $query, array(&$user));

    if ($stmt === false) {
      throw new Exception("SQL Prepare Error: " . print_r(sqlsrv_errors(), true));
    }

    $result = sqlsrv_execute($stmt);

    if ($result === false) {
      throw new Exception("Query execution failed: " . print_r(sqlsrv_errors(), true));
    }

    $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

    // Validasi password
    if ($row && $pass === $row["password"]) {
      // Set session
      $_SESSION['user'] = $row["username"];
      $_SESSION['role'] = $row["role"];
      $_SESSION['nama'] = $row["nama"];
      $_SESSION['nim'] = $row["nim"];  

      return [
        'success' => true,
        'role' => $row["role"]
      ];
    } else {
      return [
        'success' => false,
        'message' => "Username atau password salah"
      ];
    }
  } catch (Exception $e) {
    error_log("Login error: " . $e->getMessage());
    return [
      'success' => false,
      'message' => "Terjadi kesalahan pada server: " . $e->getMessage()
    ];
  }
}

// Proses login untuk request POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $user = htmlspecialchars(trim($_POST["username"]));
  $pass = htmlspecialchars(trim($_POST["password"]));

  $loginResult = handleLogin($conn, $user, $pass);

  // Kirim response JSON
  header('Content-Type: application/json');
  echo json_encode($loginResult);

  // Tutup koneksi database
  sqlsrv_close($conn);
  exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Sistem Bebas Tanggungan - Politeknik Negeri Malang" />
  <meta name="theme-color" content="#3b82f6" />
  <title>Login - Sistem Bebas Tanggungan</title>

  <!-- Favicon -->
  <link rel="shortcut icon" href="../assets/images/logo_polinema.png" type="image/x-icon" />

  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

  <!-- Material Icons -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

  <!-- Custom CSS -->
  <link rel="stylesheet" href="../assets/css/login.css" />
</head>

<body>
  <!-- Alert Container -->
  <div class="alert-container"></div>

  <div class="login-container">
    <div class="login-box">
      <!-- Logo -->
      <div class="text-center mb-4">
        <img src="../assets/images/logo_polinema.png" alt="Logo Politeknik Negeri Malang" class="logo-img" />
      </div>

      <!-- Header Text -->
      <h4 class="text-center">Selamat Datang di</h4>
      <h4 class="text-center">Sistem Bebas Tanggungan!</h4>
      <p class="text-center text-muted mb-4">
        Silakan login untuk melanjutkan ke dalam sistem
      </p>

      <!-- Login Form -->
      <form id="loginForm" method="POST">
        <!-- Username Field -->
        <div class="form-group mb-3">
          <label class="form-label" for="username">Username</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="material-icons">person</i>
            </span>
            <input type="text" class="form-control" name="username" id="username" placeholder="Masukkan username" required />
          </div>
        </div>

        <!-- Password Field -->
        <div class="form-group mb-3">
          <label class="form-label" for="password">Password</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="material-icons">lock</i>
            </span>
            <input type="password" class="form-control" name="password" id="password" placeholder="Masukkan password" required />
          </div>
        </div>

        <!-- Remember Me -->
        <div class="remember-me-container mb-4">
          <div class="remember-me-wrapper">
            <input type="checkbox" class="form-check-input" id="rememberMe" name="rememberMe" />
            <label class="remember-me-text" for="rememberMe">Ingat saya</label>
          </div>
        </div>

        <!-- Login Button -->
        <div class="d-grid">
          <button type="submit" class="btn btn-primary">LOGIN</button>
        </div>

        <!-- Forgot Password -->
        <div class="text-center mt-3">
          <p class="text-muted">
            Lupa password?
            <a href="forgot_password.php" class="text-decoration-none">Reset disini</a>
          </p>
        </div>
      </form>
    </div>
  </div>

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

  <!-- Custom JS -->
  <script src="../assets/js/login.js"></script>
</body>

</html>
