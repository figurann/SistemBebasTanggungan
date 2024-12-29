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

    <style>
        /* Gaya Tabel yang Diperbarui */
        table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            /* Menambahkan border-radius untuk sudut tabel */
            overflow: hidden;
            /* Menghindari sudut tajam */
        }

        table.data-table th,
        table.data-table td {
            border: 1px solid #ddd;
            padding: 12px;
            /* Meningkatkan padding untuk tampilan yang lebih baik */
            text-align: center;
            /* Meratakan teks ke tengah */
        }

        table.data-table th {
            background-color: #007bff;
            /* Warna biru untuk header */
            color: #fff;
            font-weight: bold;
        }

        table.data-table tr:nth-child(even) {
            background-color: #f2f2f2;
            /* Warna latar belakang untuk baris genap */
        }

        table.data-table tr:hover {
            background-color: transparent;
            /* Menghapus warna latar belakang saat hover */
        }

        /* Kelas untuk Status Verifikasi */
        .status-verified {
            background-color: #d4edda;
            /* Hijau muda untuk Disetujui */
            color: #155724;
            /* Warna teks yang gelap untuk kontras */
            border-radius: 5px;
            /* Sudut melengkung */
            padding: 5px;
            /* Padding untuk estetika */
        }

        .status-pending {
            background-color: #fff3cd;
            /* Kuning untuk Menunggu */
            color: #856404;
            /* Warna teks yang gelap untuk kontras */
            border-radius: 5px;
            /* Sudut melengkung */
            padding: 5px;
            /* Padding untuk estetika */
        }

        .status-rejected {
            background-color: #f8d7da;
            /* Merah untuk Ditolak */
            color: #721c24;
            /* Warna teks yang gelap untuk kontras */
            border-radius: 5px;
            /* Sudut melengkung */
            padding: 5px;
            /* Padding untuk estetika */
        }
    </style>
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
    </header>

    <!-- Main Container -->
    <div class="container">

        <!-- Main Content -->
        <main class="main-content">
            <div class="content">
                <div id="card-container">
                    <!-- Kartu akan disisipkan di sini oleh JavaScript -->
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
                                <th>Status</th> <!-- Teks "Status Verifikasi" diubah menjadi "Status" -->
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
                            $stmt = sqlsrv_query($conn, $query, array($username));

                            if ($stmt === false) {
                                die(print_r(sqlsrv_errors(), true));
                            }

                            $no = 1;
                            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                                $status_class = '';
                                switch ($row['status']) {
                                    case 'Diverifikasi':
                                        $status_class = 'status-verified'; // Kelas untuk Disetujui  
                                        break;
                                    case 'Menunggu':
                                        $status_class = 'status-pending'; // Kelas untuk Pending  
                                        break;
                                    case 'Ditolak':
                                        $status_class = 'status-rejected'; // Kelas untuk Ditolak  
                                        break;
                                }
                            ?>
                                <tr data-id="<?= htmlspecialchars($row['ID']) ?>">
                                    <td><?= $no++ ?></td>
                                    <td><?= htmlspecialchars($row['nama']) ?></td>
                                    <td><?= htmlspecialchars($row['nim']) ?></td>
                                    <td><span class="<?= $status_class ?>"><?= htmlspecialchars($row['status']) ?></span></td>
                                    <td><?= htmlspecialchars($row['nama_dokumen']) ?></td>
                                    <td><?= htmlspecialchars($row['isi_komentar'] ?? '') ?></td>
                                </tr>
                            <?php }
                            sqlsrv_free_stmt($stmt);
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>

    <!-- Scripts -->
    <script src="../../assets/js/mahasiswa/dashboard.js?v=1.1"></script>
    <script src="../../assets/js/mahasiswa/card.js?v=1.1"></script>
</body>

</html>