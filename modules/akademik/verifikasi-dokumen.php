<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifikasi Dokumen Tugas Akhir - Sistem Bebas Tanggungan</title>

    <!-- Favicon -->
    <link rel="shortcut icon" href="../assets/images/logo_polinema.png" type="image/x-icon">
    <!-- CSS -->
    <link rel="stylesheet" href="../../assets/css/programstudi/verifikasi/verifikasi-ukt.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>

<body>
    <div class="container">
        <div class="page-header">
            <div class="header-content">
                <img src="../../assets/images/logo_polinema.png" alt="Logo Polinema" class="logo">
                <h1 class="page-title">Verifikasi Dokumen Tugas Akhir</h1>
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
            </div>

            <table id="dataTable" class="data-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Mahasiswa</th>
                        <th>NIM</th>
                        <th>Dokumen</th>
                        <th>Status Verifikasi</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    // Koneksi ke database SQL Server
                    include '../../config/config.php';

                    // Query untuk mengambil data dokumen termasuk path_dokumen
                    $query = "SELECT m.nama, m.nim, d.path_dokumen, d.status, d.ID
                             FROM pengguna.Mahasiswa m 
                             INNER JOIN dokumen.UploadDokumen d ON d.NIM = m.NIM 
                             INNER JOIN pengguna.Admin a ON d.NIDN = a.NIDN
                             WHERE a.NIDN = '0002020202'
                             ORDER BY d.NIM DESC";
                    $stmt = sqlsrv_query($conn, $query);
                    
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
                            <td>
                                <?php if($row['path_dokumen']): ?>
                                    <a href="../mahasiswa/<?= htmlspecialchars($row['path_dokumen']) ?>" target="_blank" class="btn-view">
                                        <i class="fas fa-file-pdf"></i> Lihat Dokumen
                                    </a>
                                <?php else: ?>
                                    <span>Tidak ada file</span>
                                <?php endif; ?>
                            </td>
                            <td <?= $status_class ?>><?= htmlspecialchars($row['status']) ?></td>
                            <td>
                                <?php if($row['status'] != 'Sudah Diverifikasi' && $row['status'] != 'Ditolak'): ?>
                                    <button class="btn btn-success" onclick="verifikasi(<?= htmlspecialchars($row['ID']) ?>)">Verifikasi</button>
                                    <button class="btn btn-danger" onclick="tolakDokumen(<?= htmlspecialchars($row['ID']) ?>)">Tolak</button>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php } 
                    sqlsrv_free_stmt($stmt);
                    ?>
                </tbody>
            </table>
        </div>

        <script>
        function verifikasi(id) {
            if(confirm('Apakah Anda yakin ingin memverifikasi dokumen ini?')) {
                fetch('verifikasi_proses.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'id=' + id
                })
                .then(response => response.json())
                .then(data => {
                    if(data.success) {
                        const row = document.querySelector(`tr[data-id="${id}"]`);
                        const statusCell = row.querySelector("td:nth-child(5)");
                        const buttonCell = row.querySelector("td:nth-child(6)");
                        statusCell.textContent = "Sudah Diverifikasi";
                        statusCell.style.color = "green";
                        buttonCell.innerHTML = '';
                        alert('Dokumen berhasil diverifikasi!');
                        location.reload();
                    } else {
                        alert('Gagal memverifikasi dokumen!');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Terjadi kesalahan saat memverifikasi dokumen!');
                });
            }
        }

        function tolakDokumen(id) {
            const alasan = prompt('Masukkan alasan penolakan:');
            if (alasan) {
                if(confirm('Apakah Anda yakin ingin menolak dokumen ini?')) {
                    fetch('tolak_dokumen.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `id=${id}&alasan=${encodeURIComponent(alasan)}`
                    })
                    .then(response => response.json())
                    .then(data => {
                        if(data.success) {
                            const row = document.querySelector(`tr[data-id="${id}"]`);
                            const statusCell = row.querySelector("td:nth-child(5)");
                            const buttonCell = row.querySelector("td:nth-child(6)");
                            statusCell.textContent = "Ditolak";
                            statusCell.style.color = "red";
                            buttonCell.innerHTML = '';
                            alert('Dokumen telah ditolak!');
                            location.reload();
                        } else {
                            console.error('Error details:', data.error);
                            alert('Gagal menolak dokumen! Error: ' + data.error);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Terjadi kesalahan saat menolak dokumen: ' + error.message);
                    });
                }
            }
        }
        </script>
    <script src="../../../assets/js/programstudi/verifikasi/verifikasi-ukt.js"></script>
  </body>
</html>