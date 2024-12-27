<?php
// Data statis untuk contoh tampilan SKKM
$dummy_data = [
    [
        'nim' => '2024001',
        'nama' => 'Mahasiswa 1',
        'prodi' => 'Teknik Informatika',
        'jenis_kegiatan' => 'Organisasi Kampus',
        'nama_kegiatan' => 'Ketua BEM',
        'poin' => 20,
        'tahun' => '2023',
        'status' => 'pending',
        'bukti_path' => 'skkm_2024001.pdf'
    ],
    [
        'nim' => '2024002',
        'nama' => 'Mahasiswa 2',
        'prodi' => 'Sistem Informasi',
        'jenis_kegiatan' => 'Lomba',
        'nama_kegiatan' => 'Juara 1 Hackathon',
        'poin' => 15,
        'tahun' => '2023',
        'status' => 'approved',
        'bukti_path' => 'skkm_2024002.pdf'
    ],
    [
        'nim' => '2024003',
        'nama' => 'Mahasiswa 3',
        'prodi' => 'Teknik Informatika',
        'jenis_kegiatan' => 'Seminar',
        'nama_kegiatan' => 'Workshop AI',
        'poin' => 10,
        'tahun' => '2023',
        'status' => 'rejected',
        'bukti_path' => 'skkm_2024003.pdf'
    ],
    [
        'nim' => '2024004',
        'nama' => 'Mahasiswa 4',
        'prodi' => 'Sistem Informasi',
        'jenis_kegiatan' => 'Kepanitiaan',
        'nama_kegiatan' => 'Panitia Dies Natalis',
        'poin' => 8,
        'tahun' => '2023',
        'status' => 'pending',
        'bukti_path' => 'skkm_2024004.pdf'
    ],
];
?>

<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifikasi SKKM - Sistem Bebas Tanggungan</title>

    <!-- Favicon -->
    <link rel="shortcut icon" href="../../assets/images/logo_polinema.png" type="image/x-icon">
    <!-- CSS -->
    <link rel="stylesheet" href="../../../assets/css/programstudi/verifikasi/verifikasi-skkm.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>

<body>
    <div class="container">
        <div class="page-header">
            <div class="header-content">
                <img src="../../../assets/images/logo_polinema.png" alt="Logo Polinema" class="logo">
                <h1 class="page-title">Verifikasi SKKM</h1>
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
                <select id="kegiatanFilter" class="filter-select">
                    <option value="all">Semua Jenis Kegiatan</option>
                    <option value="Organisasi Kampus">Organisasi Kampus</option>
                    <option value="Lomba">Lomba</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Kepanitiaan">Kepanitiaan</option>
                </select>
            </div>

            <table id="dataTable" class="data-table">
                <thead>
                    <tr>
                        <th>NIM</th>
                        <th>Nama</th>
                        <th>Program Studi</th>
                        <th>Jenis Kegiatan</th>
                        <th>Nama Kegiatan</th>
                        <th>Poin</th>
                        <th>Tahun</th>
                        <th>Bukti</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($dummy_data as $row): ?>
                        <tr data-nim="<?php echo $row['nim']; ?>" data-status="<?php echo $row['status']; ?>" data-kegiatan="<?php echo $row['jenis_kegiatan']; ?>">
                            <td><?php echo $row['nim']; ?></td>
                            <td><?php echo $row['nama']; ?></td>
                            <td><?php echo $row['prodi']; ?></td>
                            <td><?php echo $row['jenis_kegiatan']; ?></td>
                            <td><?php echo $row['nama_kegiatan']; ?></td>
                            <td><?php echo $row['poin']; ?></td>
                            <td><?php echo $row['tahun']; ?></td>
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
                                    <button class="btn btn-approve" onclick="verifySKKM('<?php echo $row['nim']; ?>', 'approve')">
                                        <i class="fas fa-check"></i>
                                    </button>
                                    <button class="btn btn-reject" onclick="verifySKKM('<?php echo $row['nim']; ?>', 'reject')">
                                        <i class="fas fa-times"></i>
                                    </button>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

        <!-- Modal Preview Bukti SKKM -->
        <div id="previewModal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Bukti SKKM</h2>
                <div class="bukti-preview">
                    <iframe id="previewFrame" class="preview-frame" src="" frameborder="0"></iframe>
                </div>
            </div>
        </div>
    </div>

    <!-- JavaScript -->
    <script src="../../../assets/js/programstudi/verifikasi/verifikasi-skkm.js"></script>
</body>

</html>