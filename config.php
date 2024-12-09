<?php
$serverName = "pigu\SQLEXPRESS";
$connectionOptions = array(
    "Database" => "bebastang",
    "Uid" => "",
    "PWD" => ""
);

$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}
