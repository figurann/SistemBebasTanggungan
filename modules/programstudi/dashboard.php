<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Program Studi - Sistem Bebas Tanggungan</title>

    <!-- Favicon -->
    <link rel="shortcut icon" href="../../assets/images/logo_polinema.png" type="image/x-icon">

    <!-- Stylesheets -->
    <link rel="stylesheet" href="../../assets/css/programstudi/dashboard.css?v=1.2">
    <link rel="stylesheet" href="../../assets/css/programstudi/card.css?v=1.2">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-..."
        crossorigin="anonymous"
        referrerpolicy="no-referrer">
</head>

<body>
    <!-- Header Section -->
    <header class="title-section">
        <div class="title-container">
            <a href="dashboard.php" class="title-link">
                <img src="../../assets/images/logo_polinema.png" alt="Logo Polinema" class="logo">
                <h1 class="main-title">Sistem Bebas Tanggungan</h1>
            </a>
        </div>

        <div class="header-icons">
            <div class="profile-container">
                <img src="../../assets/images/programstudi/programstudi_1.jpg" alt="User Profile" class="profile-pic">
                <span class="username">Program Studi</span>
                <div class="profile-dropdown">
                    <a href="../../views/forgot_password.php" class="dropdown-item">
                        Reset Password
                    </a>
                    <a href="../../views/login.php" id="logout" class="dropdown-item">
                        Logout
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Container -->
    <main class="container">
        <div class="content">
            <div id="card-container">
                <!-- Cards will be dynamically inserted here by JavaScript -->
            </div>
        </div>
    </main>

    <!-- Notification Toast -->
    <div id="notification-toast" class="toast">
        <div class="toast-content">
            <i class="fas fa-info-circle toast-icon"></i>
            <div class="toast-message"></div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="../../assets/js/programstudi/dashboard.js?v=1.2"></script>
    <script src="../../assets/js/programstudi/card.js?v=1.2"></script>
</body>

</html>