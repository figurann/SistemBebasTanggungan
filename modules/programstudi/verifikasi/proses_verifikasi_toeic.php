<?php
include '../../../config/config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['id'])) {
    $id = $_POST['id'];
    
    $query = "UPDATE pengguna.NilaiTOEIC
              SET status = 'Sudah Diverifikasi' 
              WHERE ID = ?";
    $params = array($id);
    
    $stmt = sqlsrv_query($conn, $query, $params);
    
    if ($stmt === false) {
        echo json_encode(['success' => false, 'message' => print_r(sqlsrv_errors(), true)]);
    } else {
        echo json_encode(['success' => true]);
        sqlsrv_free_stmt($stmt);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
} 