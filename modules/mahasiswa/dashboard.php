<?php
session_start();
include '../../config/config.php';

// Cek jika user belum login
if (!isset($_SESSION['user'])) {
    header('Location: ../../views/login.php');
    exit();
}

// Ambil data mahasiswa dari database
$username = $_SESSION['user'];
$query = "SELECT m.nim 
          FROM pengguna.Mahasiswa m 
          WHERE m.username = ?";

$stmt = sqlsrv_prepare($conn, $query, array($username));

if ($stmt === false) {
    die("Error in preparing statement: " . print_r(sqlsrv_errors(), true));
}

$nim = '';
if (sqlsrv_execute($stmt)) {
    if ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $nim = $row['nim'];
    }
}

sqlsrv_close($conn);

?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mahasiswa - Sistem Bebas Tanggungan</title>

    <!-- Favicon -->
    <link rel="shortcut icon" href="../../assets/images/logo_polinema.png" type="image/x-icon" />

    <!-- Stylesheets -->
    <link rel="stylesheet" href="../../assets/css/mahasiswa/dashboard.css?v=1.1" />
    <link rel="stylesheet" href="../../assets/css/mahasiswa/card.css?v=1.1" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
</head>

<body>
    <!-- Header Section -->
    <header class="title-section">
        <div class="title-container">
            <a href="dashboard.php" class="title-link">
                <img src="../../assets/images/logo_polinema.png" alt="Logo Polinema" class="logo" />
                <h1 class="main-title">Sistem Bebas Tanggungan</h1>
            </a>
        </div>

        <div class="header-icons">
        <div class="profile-container">
         <img src="../../assets/images/mahasiswa/mahasiswa_1.jpg" alt="User Profile" class="profile-pic" />
    <span class="username"><?php echo htmlspecialchars($_SESSION['user']); ?></span>
    <div class="profile-dropdown">
        <a href="../../views/forgot_password.php">Reset Password</a>
        <a href="../../views/login.php" id="logout">Logout</a>
    </div>
</div>
</div>
        </div>
    </header>

    <!-- Main Container -->
    <div class="container">
        <!-- Main Content -->
        <main class="main-content">
            <div class="content">
                <div id="card-container">
                    <!-- Cards will be dynamically inserted here by JavaScript -->
                </div>
            </div>
        </main>
    </div>

    <!-- Scripts -->
    <script src="../../assets/js/mahasiswa/dashboard.js?v=1.1"></script>
    <script src="../../assets/js/mahasiswa/card.js?v=1.1"></script>
</body>

</html>
