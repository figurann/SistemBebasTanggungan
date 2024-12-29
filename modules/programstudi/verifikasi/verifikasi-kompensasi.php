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
                        <th>Jumlah Kompen</th>
                        <th>Jumlah Kompen Lunas</th>
                        <th>Status Verifikasi</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    // Koneksi ke database SQL Server
                    include '../../../config/config.php';

                    // Query untuk mengambil data dokumen termasuk path_dokumen
                    $query = "SELECT m.nama, m.NIM, t.jumlah_kompen, t.jumlah_kompen_selesai, t.status, t.ID
                             FROM pengguna.Mahasiswa m JOIN 
                             pengguna.JumlahKompen t ON m.NIM = t.NIM
                             ";
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
                            <td><?= htmlspecialchars($row['NIM']) ?></td>
                            <td><?= htmlspecialchars($row['jumlah_kompen']) ?></td>
                            <td><?= htmlspecialchars($row['jumlah_kompen_selesai']) ?></td>
                            <td <?= $status_class ?>><?= htmlspecialchars($row['status']) ?></td>
                            <td>
                                <?php if($row['status'] != 'Sudah Diverifikasi' && $row['status'] != 'Ditolak'): ?>
                                    <button class="btn btn-approve" onclick="verifikasi(<?= htmlspecialchars($row['ID']) ?>)"><i class="fas fa-check"></i></button>
                                    <button class="btn btn-reject" onclick="tolakDokumen(<?= htmlspecialchars($row['ID']) ?>)"><i class="fas fa-times"></i></button>
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
            if(confirm('Apakah Anda yakin ingin memverifikasi Kompen ini?')) {
                fetch('proses_verifikasi_kompen.php', {
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
                        alert('Kompen berhasil diverifikasi!');
                        location.reload();
                    } else {
                        alert('Gagal memverifikasi Kompen!');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Terjadi kesalahan saat memverifikasi Kompen!');
                });
            }
        }

        function tolakDokumen(id) {
            if(confirm('Apakah Anda yakin ingin menolak Kompen ini?')) {
                fetch('tolak_kompen.php', {
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
                        alert('Kompen telah ditolak karena tidak memenuhi kriteria!');
                        location.reload();
                    } else {
                        alert('Gagal menolak Kompen!');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Terjadi kesalahan saat menolak Kompen!');
                });
            }
        }
    </script>

    <!-- JavaScript -->
    <script src="../../../assets/js/programstudi/verifikasi/verifikasi-kompensasi.js"></script>
</body>

</html>