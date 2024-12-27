<?php
// Data statis untuk contoh tampilan
$dummy_data = [
    [
        'nim' => '2024001',
        'nama' => 'Mahasiswa 1',
        'prodi' => 'Teknik Informatika',
        'jenis' => 'Alpha',
        'semester' => 'Ganjil 2023/2024',
        'status' => 'pending',
        'bukti_path' => 'bukti_2024001.jpg'
    ],
    [
        'nim' => '2024002',
        'nama' => 'Mahasiswa 2',
        'prodi' => 'Sistem Informasi',
        'jenis' => 'Sakit',
        'semester' => 'Ganjil 2023/2024',
        'status' => 'approved',
        'bukti_path' => 'bukti_2024002.jpg'
    ],
    // Tambahkan data dummy lainnya sesuai kebutuhan
];
?>

<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifikasi Kompensasi - Sistem Bebas Tanggungan</title>

    <!-- Favicon -->
    <link rel="shortcut icon" href="../../assets/images/logo_polinema.png" type="image/x-icon">
    <!-- CSS -->
    <link rel="stylesheet" href="../../../assets/css/programstudi/verifikasi/verifikasi-kompensasi.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>

<body>
    <div class="container">
        <div class="page-header">
            <div class="header-content">
                <img src="../../../assets/images/logo_polinema.png" alt="Logo Polinema" class="logo">
                <h1 class="page-title">Verifikasi Kompensasi</h1>
            </div>
            <a href="../dashboard.php" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i> Kembali
            </a>
        </div>

        <div class="verification-card">
            <div class="search-filter">
                <div class="search-box">
                    <input type="text" id="searchInput" placeholder="Cari berdasarkan NIM atau Nama...">
                </div>
                <div class="filter-group">
                    <select id="statusFilter" class="filter-select">
                        <option value="all">Semua Status</option>
                        <option value="pending">Menunggu Verifikasi</option>
                        <option value="approved">Disetujui</option>
                        <option value="rejected">Ditolak</option>
                    </select>
                    <select id="semesterFilter" class="filter-select">
                        <option value="all">Semua Semester</option>
                        <option value="Ganjil 2023/2024">Ganjil 2023/2024</option>
                        <option value="Genap 2023/2024">Genap 2023/2024</option>
                    </select>
                </div>
            </div>

            <div class="table-wrapper">
                <table id="dataTable" class="data-table">
                    <thead>
                        <tr>
                            <th>NIM</th>
                            <th>Nama</th>
                            <th>Program Studi</th>
                            <th>Jenis</th>
                            <th>Semester</th>
                            <th>Bukti</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($dummy_data as $row): ?>
                            <tr data-nim="<?php echo $row['nim']; ?>" data-status="<?php echo $row['status']; ?>">
                                <td><?php echo $row['nim']; ?></td>
                                <td><?php echo $row['nama']; ?></td>
                                <td><?php echo $row['prodi']; ?></td>
                                <td><?php echo $row['jenis']; ?></td>
                                <td><?php echo $row['semester']; ?></td>
                                <td>
                                    <button class="btn btn-view" onclick="viewDocument('<?php echo $row['nim']; ?>')">
                                        <i class="fas fa-eye"></i> Lihat Bukti
                                    </button>
                                </td>
                                <td>
                                    <span class="status-cell <?php echo $row['status']; ?>">
                                        <?php
                                        switch ($row['status']) {
                                            case 'pending':
                                                echo 'Menunggu Verifikasi';
                                                break;
                                            case 'approved':
                                                echo 'Disetujui';
                                                break;
                                            case 'rejected':
                                                echo 'Ditolak';
                                                break;
                                        }
                                        ?>
                                    </span>
                                </td>
                                <td>
                                    <?php if ($row['status'] == 'pending'): ?>
                                        <button class="btn btn-approve" onclick="verifyKompensasi('<?php echo $row['nim']; ?>', 'approve')">
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <button class="btn btn-reject" onclick="verifyKompensasi('<?php echo $row['nim']; ?>', 'reject')">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    <?php endif; ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal Preview Bukti Kompensasi -->
        <div id="previewModal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Bukti Kompensasi</h2>
                <div class="bukti-preview">
                    <img id="previewImage" class="preview-image" src="" alt="Bukti Kompensasi">
                </div>
            </div>
        </div>
    </div>

    <!-- JavaScript -->
    <script src="../../../assets/js/programstudi/verifikasi/verifikasi-kompensasi.js"></script>
</body>

</html>