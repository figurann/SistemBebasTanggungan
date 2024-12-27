<?php
// Simulasi session
$_SESSION['user_id'] = 1;
$_SESSION['role'] = 'admin';
$_SESSION['nama'] = 'Admin SKKM';

// Data dummy untuk SKKM
$dummy_data = [
    [
        'id' => 1,
        'nim' => '2141720001',
        'nama_mahasiswa' => 'Ahmad Fauzi',
        'kategori' => 'Prestasi',
        'kegiatan' => 'Juara 1 Lomba Programming',
        'tanggal' => '2024-01-15',
        'status' => 'pending',
        'bukti' => 'sertifikat_1.pdf'
    ],
    // ... data lainnya tetap sama ...
];
?>

<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifikasi SKKM - Sistem Bebas Tanggungan</title>
    <!-- CSS -->
    <link rel="stylesheet" href="../../../assets/css/programstudi/verifikasi/verifikasi-kompensasi.css">
    <!-- Tambahkan base styling -->
    <style>
        .page-transition {
            opacity: 0;
            animation: fadeIn 0.3s ease forwards;
        }

        .action-buttons {
            display: flex;
            gap: 8px;
            align-items: center;
        }

        .data-table td {
            vertical-align: middle;
        }
    </style>
</head>

<body>
    <div class="container page-transition">
        <div class="content-wrapper">
            <!-- Header -->
            <header class="page-header">
                <div class="header-content">
                    <img src="./assets/images/logo-polinema.png" alt="Logo Polinema" class="logo">
                    <h1 class="page-title">Verifikasi SKKM</h1>
                </div>
                <div class="header-actions">
                    <button class="btn btn-secondary">
                        <i data-lucide="download"></i>
                        Export Data
                    </button>
                </div>
            </header>

            <!-- Main Content -->
            <div class="verification-card">
                <!-- Search and Filter -->
                <div class="search-filter">
                    <div class="search-box">
                        <input type="text" placeholder="Cari berdasarkan NIM atau nama...">
                        <i class="search-icon" data-lucide="search"></i>
                    </div>
                    <div class="filter-group">
                        <select class="filter-select">
                            <option value="">Semua Kategori</option>
                            <option value="prestasi">Prestasi</option>
                            <option value="organisasi">Organisasi</option>
                            <option value="pelatihan">Pelatihan</option>
                            <option value="kompetisi">Kompetisi</option>
                        </select>
                        <select class="filter-select">
                            <option value="">Semua Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                <!-- Table -->
                <div class="table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>NIM</th>
                                <th>Nama</th>
                                <th>Kategori</th>
                                <th>Kegiatan</th>
                                <th>Tanggal</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($dummy_data as $data): ?>
                                <tr data-id="<?php echo $data['id']; ?>">
                                    <td><?php echo $data['nim']; ?></td>
                                    <td><?php echo $data['nama_mahasiswa']; ?></td>
                                    <td><?php echo $data['kategori']; ?></td>
                                    <td><?php echo $data['kegiatan']; ?></td>
                                    <td><?php echo date('d/m/Y', strtotime($data['tanggal'])); ?></td>
                                    <td>
                                        <span class="status-cell <?php echo $data['status']; ?>">
                                            <?php echo ucfirst($data['status']); ?>
                                        </span>
                                    </td>
                                    <td>
                                        <div class="action-buttons">
                                            <button class="btn btn-view" onclick="viewDocument(<?php echo $data['id']; ?>)">
                                                <i data-lucide="file-text"></i>
                                                View
                                            </button>
                                            <?php if ($data['status'] === 'pending'): ?>
                                                <button class="btn btn-approve" onclick="approveSKKM(<?php echo $data['id']; ?>)">
                                                    <i data-lucide="check"></i>
                                                </button>
                                                <button class="btn btn-reject" onclick="rejectSKKM(<?php echo $data['id']; ?>)">
                                                    <i data-lucide="x"></i>
                                                </button>
                                            <?php endif; ?>
                                        </div>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div id="documentModal" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Detail SKKM</h2>
            <div id="documentDetails"></div>
            <div class="bukti-preview">
                <img src="" alt="Preview Dokumen" class="preview-image" id="previewImage">
            </div>
        </div>
    </div>

    <!-- Notification -->
    <div id="notification" class="notification"></div>

    <!-- Scripts -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="../../../assets/js/programstudi/verifikasi/verifikasi-kompensasi.js"></script>
</body>

</html>