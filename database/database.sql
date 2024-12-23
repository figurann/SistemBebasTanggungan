CREATE DATABASE bebastang;
GO

USE bebastang;
GO


-- Create Schemas
CREATE SCHEMA pengguna AUTHORIZATION dbo;
GO
CREATE SCHEMA prodi AUTHORIZATION dbo;
GO
CREATE SCHEMA dokumen AUTHORIZATION dbo;
GO

-- Create Tables
-- Table Program Studi
CREATE TABLE prodi.ProgramStudi (
    ID INT NOT NULL IDENTITY,
    nama_prodi NVARCHAR(100) NOT NULL,
    jurusan NVARCHAR(100) NOT NULL,
    CONSTRAINT PK_ProgramStudi PRIMARY KEY(ID)
);

-- Table User
CREATE TABLE pengguna.[User] (
    username VARCHAR(20) NOT NULL,
    password NVARCHAR(100) NOT NULL,
    level NVARCHAR(20) NOT NULL, -- admin_jurusan, admin_pusat, mahasiswa
    CONSTRAINT PK_User PRIMARY KEY(username)
);

-- Table Mahasiswa
CREATE TABLE pengguna.Mahasiswa (
    NIM VARCHAR(10) NOT NULL,
    nama NVARCHAR(100) NOT NULL,
    NIK VARCHAR(16) NOT NULL UNIQUE,
    tempat_lahir NVARCHAR(50) NOT NULL,
    tanggal_lahir DATE NOT NULL,
    alamat NVARCHAR(255) NOT NULL,
    no_telp VARCHAR(15) NOT NULL,
    jenis_kelamin NVARCHAR(10) NOT NULL,
    id_prodi INT NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    CONSTRAINT PK_Mahasiswa PRIMARY KEY(NIM),
    CONSTRAINT FK_Mahasiswa_Prodi FOREIGN KEY(id_prodi) REFERENCES prodi.ProgramStudi(ID),
    CONSTRAINT FK_Mahasiswa_User FOREIGN KEY(username) REFERENCES pengguna.[User](username)
);

-- Table Admin
CREATE TABLE pengguna.Admin (
    NIDN VARCHAR(10) NOT NULL,
    nama NVARCHAR(100) NOT NULL,
    NIK VARCHAR(16) NOT NULL UNIQUE,
    tempat_lahir NVARCHAR(50) NOT NULL,
    tanggal_lahir DATE NOT NULL,
    alamat NVARCHAR(255) NOT NULL,
    no_telp VARCHAR(15) NOT NULL,
    jenis_kelamin NVARCHAR(10) NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    CONSTRAINT PK_Admin PRIMARY KEY(NIDN),
    CONSTRAINT FK_Admin_User FOREIGN KEY(username) REFERENCES pengguna.[User](username)
);

-- Table Dokumen
CREATE TABLE dokumen.JenisDokumen (
    ID INT NOT NULL IDENTITY,
    nama_dokumen NVARCHAR(100) NOT NULL,
    tingkat NVARCHAR(20) NOT NULL, -- jurusan, pusat
    CONSTRAINT PK_JenisDokumen PRIMARY KEY(ID)
);

-- Table Upload Dokumen
CREATE TABLE dokumen.UploadDokumen (
    ID INT NOT NULL IDENTITY,
    path_dokumen NVARCHAR(255) NOT NULL,
    status NVARCHAR(20) NOT NULL, -- Diverifikasi, Ditolak, Menunggu
    tanggal DATETIME NOT NULL DEFAULT GETDATE(),
    id_dokumen INT NOT NULL,
    NIM VARCHAR(10) NULL,
    NIDN VARCHAR(10) NULL,
    CONSTRAINT PK_UploadDokumen PRIMARY KEY(ID),
    CONSTRAINT FK_Upload_JenisDokumen FOREIGN KEY(id_dokumen) REFERENCES dokumen.JenisDokumen(ID),
    CONSTRAINT FK_Upload_Mahasiswa FOREIGN KEY(NIM) REFERENCES pengguna.Mahasiswa(NIM),
    CONSTRAINT FK_Upload_Admin FOREIGN KEY(NIDN) REFERENCES pengguna.Admin(NIDN)
);

-- Table Komentar
CREATE TABLE dokumen.Komentar (
    ID INT NOT NULL IDENTITY,
    isi_komentar NVARCHAR(MAX) NOT NULL,
    tanggal DATETIME NOT NULL DEFAULT GETDATE(),
    id_upload INT NOT NULL,
    CONSTRAINT PK_Komentar PRIMARY KEY(ID),
    CONSTRAINT FK_Komentar_Upload FOREIGN KEY(id_upload) REFERENCES dokumen.UploadDokumen(ID)
);

INSERT INTO prodi.ProgramStudi (nama_prodi, jurusan) VALUES
('D-IV Teknik Informatika', 'Teknologi Informasi'),
('D-IV Sistem Informasi Bisnis', 'Teknologi Informasi'),
('D-III Manajemen Informatika', 'Teknologi Informasi'),
('D-IV Manajemen Rekayasa Konstruksi', 'Teknik Sipil'),
('D-IV Teknik Elektronika', 'Teknik Elektro');

INSERT INTO pengguna.[User] (username, password, level) VALUES
('admin_prodi', 'prodi123', 'admin_prodi'),
('admin_akademik', 'akademik123', 'admin_akademik'),
('admin_perpus', 'perpus123', 'admin_perpus'),
('superadmin', 'super123', 'superadmin'),
('2341720001', 'mhs123', 'mahasiswa'),
('2341720002', 'mhs123', 'mahasiswa');

INSERT INTO pengguna.Admin (NIDN, nama, NIK, tempat_lahir, tanggal_lahir, alamat, no_telp, jenis_kelamin, username) VALUES
('0001010101', 'Dr. Ahmad', '1234567890123456', 'Jakarta', '1980-01-01', 'Jl. Admin 1', '081234567890', 'Laki-laki', 'admin001'),
('0002020202', 'Dr. Sarah', '1234567890123457', 'Surabaya', '1982-02-02', 'Jl. Admin 2', '081234567891', 'Perempuan', 'admin002');

INSERT INTO pengguna.Mahasiswa (NIM, nama, NIK, tempat_lahir, tanggal_lahir, alamat, no_telp, jenis_kelamin, id_prodi, username) VALUES
('2341720001', 'Budi Santoso', '1234567890123458', 'Malang', '2000-03-03', 'Jl. Mhs 1', '081234567892', 'Laki-laki', 1, '2341720001'),
('2341720002', 'Ani Wulandari', '1234567890123459', 'Bandung', '2000-04-04', 'Jl. Mhs 2', '081234567893', 'Perempuan', 2, '2341720002');

INSERT INTO dokumen.JenisDokumen (nama_dokumen, tingkat) VALUES
('Laporan Skripsi', 'jurusan'),
('Surat Bebas Lab', 'jurusan'),
('Surat Bebas Pustaka', 'pusat'),
('Surat Bebas Administrasi', 'pusat');

INSERT INTO dokumen.UploadDokumen (path_dokumen, status, id_dokumen, NIM, NIDN) VALUES
('/uploads/skripsi_2341720001.pdf', 'Menunggu', 1, '2341720001', NULL),
('/uploads/bebas_lab_2341720002.pdf', 'Diverifikasi', 2, '2341720002', '0001010101');

INSERT INTO dokumen.Komentar (isi_komentar, id_upload) VALUES
('Dokumen sudah lengkap', 2);
