CREATE DATABASE bebastang;

USE bebastang;

CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);
GO

INSERT INTO users (username, password, role) VALUES 
('mahasiswa', 'mahasiswa123', 'mahasiswa'),
('admin_prodi', 'prodi123', 'admin_prodi'),
('admin_akademik', 'akademik123', 'admin_akademik'),
('admin_perpus', 'perpus123', 'admin_perpus'),
('superadmin', 'super123', 'superadmin');
GO





