<?php
include '../../config/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $alasan = $_POST['alasan'];
    
    $query = "UPDATE dokumen.UploadDokumen 
              SET status = 'Ditolak'
              WHERE ID = ?";
    
    $params = array($id);
    $stmt = sqlsrv_query($conn, $query, $params);

    $query1 = "INSERT INTO dokumen.Komentar (isi_komentar, id_upload) VALUES
                (?, ?)";
    $params1 = array($alasan, $id);
    $stmt1 = sqlsrv_query($conn, $query1, $params1);

    if ($stmt === false) {
        echo json_encode(['success' => false, 'error' => sqlsrv_errors()]);
    } else {
        echo json_encode(['success' => true]);
    }
}
?> 