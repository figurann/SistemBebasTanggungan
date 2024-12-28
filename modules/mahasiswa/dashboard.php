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
$query = "SELECT m.nim, d.status 
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

<style>
table.data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

table.data-table th, table.data-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

table.data-table th {
    background-color: #f2f2f2;
    color: #333;
}

table.data-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

table.data-table tr:hover {
    background-color: #f1f1f1;
}

table.data-table td[style] {
    font-weight: bold; /* Menebalkan teks status jika ada style */
}
table.data-table th {
    background-color: #007bff; /* Mengubah latar belakang menjadi biru */
    color: #fff; /* Mengubah warna teks menjadi putih untuk kontras */
}


</style>

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
            <div class="content">
                <div id="card-container">
                    <table id="dataTable" class="data-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Mahasiswa</th>
                                <th>NIM</th>
                                <th>Status Verifikasi</th>
                                <th>Jenis Dokumen</th>
                                <th>Komentar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            // Koneksi ke database SQL Server
                            include '../../config/config.php';

                            // Query untuk mengambil data dokumen termasuk path_dokumen
                            $query = "SELECT m.nama, m.nim, d.status, j.nama_dokumen, k.isi_komentar, d.ID
                            FROM pengguna.Mahasiswa m 
                            INNER JOIN dokumen.UploadDokumen d ON d.NIM = m.NIM
                            INNER JOIN dokumen.JenisDokumen j ON d.id_dokumen = j.ID
                            LEFT JOIN dokumen.Komentar k ON d.ID = k.id_upload
                            WHERE m.nim = ?";
                            $stmt = sqlsrv_query($conn, $query,array($username));
                            
                            if ($stmt === false) {
                                die(print_r(sqlsrv_errors(), true));
                            }

                            $no = 1;
                            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                                $status_class = ($row['status'] == 'Sudah Diverifikasi') ? 'style="color: green;"' : '';
                                ?>
                                <tr data-id="<?= htmlspecialchars($row['ID']) ?>">
                                    <td><?= $no++ ?></td>
                                    <td><?= htmlspecialchars($row['nama']) ?></td>
                                    <td><?= htmlspecialchars($row['nim']) ?></td>
                                    <td <?= $status_class ?>><?= htmlspecialchars($row['status']) ?></td>
                                    <td><?= htmlspecialchars($row['nama_dokumen']) ?></td>
                                    <td><?= htmlspecialchars($row['isi_komentar'] ?? '') ?></td>
                                </tr>
                            <?php } 
                            sqlsrv_free_stmt($stmt);
                            ?>
                        </tbody>
                    </table>
                </div>
        </main>
    </div>

    <!-- Scripts -->
    <script src="../../assets/js/mahasiswa/dashboard.js?v=1.1"></script>
    <script src="../../assets/js/mahasiswa/card.js?v=1.1"></script>
</body>

</html>
