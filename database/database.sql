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
('2341760168', 'mahasiswa123', 'mahasiswa'),
('2341760169', 'mahasiswa456', 'mahasiswa'),
('admin_prodi', 'prodi123', 'admin_prodi'),
('admin_akademik', 'akademik123', 'admin_akademik'),
('admin_perpus', 'perpus123', 'admin_perpus'),
('superadmin', 'super123', 'superadmin');
GO

CREATE TABLE mahasiswa (
    id INT PRIMARY KEY IDENTITY(1,1),         -- ID unik mahasiswa
    nim NVARCHAR(20) NOT NULL UNIQUE,         -- NIM mahasiswa
    user_id INT NOT NULL,                     -- User ID yang merujuk ke tabel users
    nama NVARCHAR(100) NOT NULL,              -- Nama lengkap mahasiswa
    email NVARCHAR(100) NOT NULL UNIQUE,      -- Email mahasiswa
    program_studi NVARCHAR(100) NOT NULL,     -- Program studi mahasiswa
    angkatan NVARCHAR(100) NOT NULL,          -- Tahun angkatan mahasiswa
    foto_profil NVARCHAR(255),                
    created_at DATETIME DEFAULT GETDATE(),    -- Waktu pembuatan akun
    updated_at DATETIME DEFAULT GETDATE(),    -- Waktu terakhir diperbarui
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO mahasiswa (nim, user_id, nama, email, program_studi, angkatan, foto_profil)
VALUES
    ('2341760168', 1, 'Budi Santoso', 'budi.santoso@student.polinema.ac.id', 'Teknik Informatika', 2020, '/uploads/mahasiswa_2341760168.jpg'),
	('2341760169', 2, 'Naufal', 'naufal.uhuy@student.polinema.ac.id', 'Sistem Informasi Bisnis', 2023, '/uploads/mahasiswa_2341760169.jpg');












