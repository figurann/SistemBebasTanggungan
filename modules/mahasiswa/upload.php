<?php
session_start();
if (isset($_POST["submit"])) {
    $targetDirectory = "";
    $idDokumen = 0;
    $nidn = "";
    if ($_POST["jenisDokumen"] === "Biaya UKT") {
        $targetDirectory = "unggah/surat-bebas-ukt/";
        $idDokumen = 4;
        $nidn = '0001010101';
    } else if ($_POST["jenisDokumen"] === "Laporan Tugas Akhir") {
        $targetDirectory = "unggah/surat-bebas-tugas/";
        $idDokumen = 1;
        $nidn = '0002020202';
    } else if ($_POST["jenisDokumen"] === "Surat Bebas Peminjaman Buku") {
        $targetDirectory = "unggah/surat-bebas-perpus/";
        $idDokumen = 3;
        $nidn = '0003030303';
    }
    $targetFile = $targetDirectory . basename($_FILES["fileToUpload"]["name"]);
    $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    $allowedExtensions = array("txt", "pdf", "doc", "docx");
    $maxFileSize = 10 * 1024 * 1024; 

    if (in_array($fileType, $allowedExtensions) && $_FILES["fileToUpload"]["size"] <= $maxFileSize) {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $targetFile)) {
            // Tambahkan koneksi database
            include "../../config/config.php";
            
            // Ambil data yang diperlukan
            $nim = $_SESSION['user'];
            $status = "menunggu"; 
            // Query untuk SQL Server
            $query = "INSERT INTO dokumen.UploadDokumen (path_dokumen, status, id_dokumen, NIM, NIDN) 
            VALUES (?, ?, ?, ?, ?)";

            $params = array($targetFile, $status, $idDokumen, $nim, $nidn);

            $stmt = sqlsrv_prepare($conn, $query, $params);

            if (sqlsrv_execute($stmt)) {
                echo "<script>
                    alert('File berhasil diunggah dan data tersimpan!');
                    setTimeout(function() {
                        window.location.href = 'dashboard.php';
                    }, 500);
                </script>";
            } else {
                echo "Gagal menyimpan data ke database: " . print_r(sqlsrv_errors(), true);
            }
        } else {
            echo "Gagal mengunggah file.";
        }
    } else {
        echo "<script>
                alert('File tidak valid atau melebihi ukuran maksimum yang diizinkan.');
                setTimeout(function() {
                    window.location.href = 'dashboard.php';
                }, 500);
            </script>";;
    }
}
?>