<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin Perpus - verifikasi Dokumen</title>

    <!-- Favicon -->
    <link
      rel="shortcut icon"
      href="../../assets/images/logo_polinema.png"
      type="image/x-icon"
    />

    <!-- Stylesheets -->
    <link rel="stylesheet" href="../../assets/css/mahasiswa/dashboard.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    />
    <style>
      /* Add custom CSS styles */
      .container {
        padding: 20px;
      }

      /* Flex container for features */
      .features {
        display: flex;
        gap: 20px;
        flex-wrap: wrap; /* Ensures features stack on smaller screens */
      }

      .feature-container {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 20px;
        background-color: #f9f9f9;
        flex: 1 1 300px; /* Ensures each feature box grows but maintains a minimum width */
        text-align: center;
        box-sizing: border-box; /* Include padding in width calculation */
      }

      .feature-container i {
        font-size: 40px;
        color: #007bff;
        margin-bottom: 15px;
      }

      .feature-container h2 {
        margin-bottom: 10px;
      }

      .feature-container p {
        margin-bottom: 15px;
      }

      .btn {
        display: inline-block;
        padding: 10px 15px;
        color: #fff;
        background-color: green;
        text-decoration: none;
        border-radius: 4px;
        text-align: center;
      }

      .btn:hover {
        background-color: #0056b3;
      }

        table {
            border-collapse: collapse;
            width: 80%;
            margin: 20px auto;
        }
        th, td {
            border: 1px solid #ddd;
            text-align: center;
            padding: 8px;
        }
        th {
            background-color: #f4f4f4;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        tr th {
            background-color: #007bff;
        }

        /* Tambahkan CSS untuk tombol */
        .btn-success {
            background-color: green;
        }

        .btn-danger {
            background-color: red;
            margin-left: 5px;
        }

        .btn:hover {
            opacity: 0.8;
        }
    </style>
  </head>

  <body>
    <header class="title-section">
      <div class="title-container">
        <a href="../dashboard_aka.html" class="title-link">
          <img
            src="../../assets/images/logo_polinema.png"
            alt="Logo Polinema"
            class="logo"
          />
          <h1 class="main-title">Sistem Bebas Tanggungan</h1>
        </a>
      </div>

        <div class="profile-container">
          <img
            src=""
            alt="User Profile"
            class="profile-pic"
          />
          <span class="username">Admin Akademik</span>

          <div class="profile-dropdown">
            <a href="../forgot_password.html">Reset Password</a>
            <a href="../login.html" id="logout">Logout</a>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <!-- Main Content -->
      <main class="main-content">
        <div class="features">
            <h1 style="text-align: center;">Daftar Dokumen Yang Harus Diverifikasi</h1>
            <table>
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
                             WHERE a.NIDN = '0003030303'
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
    <script src="../../assets/js/mahasiswa/dashboard.js"></script>
  </body>
</html>