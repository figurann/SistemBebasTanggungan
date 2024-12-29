<?php
include '../../../config/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    
    $query = "UPDATE pengguna.jumlahSKKM
              SET status = 'Ditolak'
              WHERE ID = ?";
    
    $params = array($id);
    $stmt = sqlsrv_query($conn, $query, $params);

    if ($stmt === false) {
        echo json_encode(['success' => false, 'error' => sqlsrv_errors()]);
    } else {
        echo json_encode(['success' => true]);
    }
}
?> 