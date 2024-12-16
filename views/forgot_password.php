<?php
// Include konfigurasi database
include '../config/config.php';

// Handle reset password request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $response = ["success" => false, "message" => ""];

    try {
        // Ambil data dari request
        $username = trim($_POST["username"]);
        $newPassword = trim($_POST["newPassword"]);
        $confirmPassword = trim($_POST["confirmPassword"]);

        // Validasi input
        if (empty($username) || empty($newPassword) || empty($confirmPassword)) {
            $response["message"] = "Semua field harus diisi!";
            echo json_encode($response);
            exit();
        }

        if ($newPassword !== $confirmPassword) {
            $response["message"] = "Password baru dan konfirmasi password tidak cocok!";
            echo json_encode($response);
            exit();
        }

        if (strlen($newPassword) < 8) {
            $response["message"] = "Password harus minimal 8 karakter!";
            echo json_encode($response);
            exit();
        }

        // Update password di database
        $stmt = sqlsrv_prepare(
            $conn,
            "UPDATE users SET password = ? WHERE username = ?",
            array(&$newPassword, &$username)
        );

        if ($stmt === false) {
            throw new Exception("Error preparing SQL statement: " . print_r(sqlsrv_errors(), true));
        }

        $result = sqlsrv_execute($stmt);

        if ($result === false) {
            throw new Exception("Error executing SQL statement: " . print_r(sqlsrv_errors(), true));
        }

        if (sqlsrv_rows_affected($stmt) > 0) {
            $response["success"] = true;
            $response["message"] = "Password berhasil direset!";
        } else {
            $response["message"] = "Username tidak ditemukan!";
        }
    } catch (Exception $e) {
        error_log("Reset password error: " . $e->getMessage());
        $response["message"] = "Kesalahan server. Silakan coba lagi.";
    }

    echo json_encode($response);
    sqlsrv_close($conn);
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Password - Sistem Bebas Tanggungan</title>

    <!-- Favicon -->
    <link rel="shortcut icon" href="../assets/images/logo_polinema.png" type="image/x-icon" />

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link rel="stylesheet" href="../assets/css/forgot_password.css" />
</head>

<body>
    <!-- Alert Container -->
    <div class="alert-container"></div>
    <div class="forgot-password-container">
        <div class="forgot-password-box">
            <div class="text-center mb-4">
                <img src="../assets/images/logo_polinema.png" alt="Logo" class="logo-img" />
            </div>
            <h4 class="text-center">Reset Password</h4>
            <p class="text-center text-muted mb-4">Masukkan Username dan Password baru Anda untuk melakukan reset password.</p>
            <form id="forgotPasswordForm">
                <div class="form-group mb-3">
                    <label class="form-label">Username</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="material-icons">person</i></span>
                        <input type="text" class="form-control" id="username" name="username" placeholder="Masukkan username Anda" required />
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label class="form-label">Password Baru</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="material-icons">lock</i></span>
                        <input type="password" class="form-control" id="newPassword" name="newPassword" placeholder="Masukkan password baru" required />
                    </div>
                </div>
                <div class="form-group mb-4">
                    <label class="form-label">Konfirmasi Password</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="material-icons">lock</i></span>
                        <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Konfirmasi password baru" required />
                    </div>
                </div>
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary">RESET PASSWORD</button>
                </div>
                <div class="text-center mt-3">
                    <p class="text-muted">Sudah ingat dengan Password sendiri? <a href="login.php" class="text-decoration-none">Login sekarang!</a></p>
                </div>
            </form>
            <div id="loadingSpinner" class="spinner-border text-primary" style="display: none;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../assets/js/forgot_password.js"></script>
</body>

</html>