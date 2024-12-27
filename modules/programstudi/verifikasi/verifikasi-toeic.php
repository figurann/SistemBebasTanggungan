<?php
// Data statis untuk contoh tampilan TOEIC
$dummy_data = [
    [
        'nim' => '2024001',
        'nama' => 'Mahasiswa 1',
        'prodi' => 'Teknik Informatika',
        'skor_toeic' => 785,
        'tanggal_test' => '2024-01-15',
        'tempat_test' => 'UPT Bahasa Polinema',
        'status' => 'pending',
        'bukti_path' => 'toeic_2024001.pdf'
    ],
    [
        'nim' => '2024002',
        'nama' => 'Mahasiswa 2',
        'prodi' => 'Sistem Informasi',
        'skor_toeic' => 650,
        'tanggal_test' => '2024-01-14',
        'tempat_test' => 'UPT Bahasa Polinema',
        'status' => 'approved',
        'bukti_path' => 'toeic_2024002.pdf'
    ],
    [
        'nim' => '2024003',
        'nama' => 'Mahasiswa 3',
        'prodi' => 'Teknik Informatika',
        'skor_toeic' => 450,
        'tanggal_test' => '2024-01-13',
        'tempat_test' => 'International Test Center',
        'status' => 'rejected',
        'bukti_path' => 'toeic_2024003.pdf'
    ],
    [
        'nim' => '2024004',
        'nama' => 'Mahasiswa 4',
        'prodi' => 'Sistem Informasi',
        'skor_toeic' => 550,
        'tanggal_test' => '2024-01-12',
        'tempat_test' => 'UPT Bahasa Polinema',
        'status' => 'pending',
        'bukti_path' => 'toeic_2024004.pdf'
    ],
];
?>

<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifikasi TOEIC - Sistem Bebas Tanggungan</title>

    <!-- Favicon -->
    <link rel="shortcut icon" href="../../assets/images/logo_polinema.png" type="image/x-icon">
    <!-- CSS -->
    <link rel="stylesheet" href="../../../assets/css/programstudi/verifikasi/verifikasi-toeic.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>

<body>
    <div class="container">
        <div class="page-header">
            <div class="header-content">
                <img src="../../../assets/images/logo_polinema.png" alt="Logo Polinema" class="logo">
                <h1 class="page-title">Verifikasi Sertifikat TOEIC</h1>
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
                <select id="statusFilter" class="filter-select">
                    <option value="all">Semua Status</option>
                    <option value="pending">Menunggu Verifikasi</option>
                    <option value="approved">Disetujui</option>
                    <option value="rejected">Ditolak</option>
                </select>
                <select id="skorFilter" class="filter-select">
                    <option value="all">Semua Skor</option>
                    <option value="high">Skor ≥ 700</option>
                    <option value="medium">500-699</option>
                    <option value="low">
                        < 500</option>
                </select>
            </div>

            <table id="dataTable" class="data-table">
                <thead>
                    <tr>
                        <th>NIM</th>
                        <th>Nama</th>
                        <th>Program Studi</th>
                        <th>Skor TOEIC</th>
                        <th>Tanggal Test</th>
                        <th>Tempat Test</th>
                        <th>Bukti</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($dummy_data as $row): ?>
                        <tr data-nim="<?php echo $row['nim']; ?>"
                            data-status="<?php echo $row['status']; ?>"
                            data-skor="<?php echo $row['skor_toeic']; ?>">
                            <td><?php echo $row['nim']; ?></td>
                            <td><?php echo $row['nama']; ?></td>
                            <td><?php echo $row['prodi']; ?></td>
                            <td><?php echo $row['skor_toeic']; ?></td>
                            <td><?php echo date('d/m/Y', strtotime($row['tanggal_test'])); ?></td>
                            <td><?php echo $row['tempat_test']; ?></td>
                            <td>
                                <button class="btn btn-view" onclick="viewDocument('<?php echo $row['nim']; ?>')">
                                    <i class="fas fa-eye"></i> Lihat Sertifikat
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
                                    <button class="btn btn-approve" onclick="verifyTOEIC('<?php echo $row['nim']; ?>', 'approve')">
                                        <i class="fas fa-check"></i>
                                    </button>
                                    <button class="btn btn-reject" onclick="verifyTOEIC('<?php echo $row['nim']; ?>', 'reject')">
                                        <i class="fas fa-times"></i>
                                    </button>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

        <!-- Modal Preview Sertifikat TOEIC -->
        <div id="previewModal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Sertifikat TOEIC</h2>
                <div class="bukti-preview">
                    <iframe id="previewFrame" class="preview-frame" src="" frameborder="0"></iframe>
                </div>
            </div>
        </div>
    </div>

    <!-- JavaScript -->
    <script src="../../../assets/js/programstudi/verifikasi/verifikasi-toeic.js"></script>
</body>

</html>