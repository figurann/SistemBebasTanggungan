<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mahasiswa - Sistem Bebas Tanggungan</title>

    <!-- Favicon -->
    <link
      rel="shortcut icon"
      href="../../assets/images/logo_polinema.png"
      type="image/x-icon"
    />

    <!-- Stylesheets -->
    <link rel="stylesheet" href="../../assets/css/perpustakaan/dashboard.css" />
    <link rel="stylesheet" href="../../assets/css/perpustakaan/card.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    />
  </head>

  <body>
    <!-- Header Section -->
    <header class="title-section">
      <div class="title-container">
        <a href="../../mahasiswa/dashboard.html" class="title-link">
          <img
            src="../../assets/images/logo_polinema.png"
            alt="Logo Polinema"
            class="logo"
          />
          <h1 class="main-title">Sistem Bebas Tanggungan</h1>
        </a>
      </div>

      <div class="header-icons">
        <div class="profile-container">
          <img
            src="../../assets/images/mahasiswa/mahasiswa_1.jpg"
            alt="User Profile"
            class="profile-pic"
          />
          <span class="username">2341760168</span>
          <div class="profile-dropdown">
            <a href="../../forgot_password.html">Reset Password</a>
            <a href="../../login.html" id="logout">Logout</a>
          </div>
        </div>
      </div>
    </header>
    
      <!-- Main Content -->
      <main class="main-content">
        <div class="content">
          <div id="card-container">
            <div class="card">
              <h3>Data Peminjam buku Buku</h3>
              <p>Melihat data Mahasiswa peminjam buku.</p>
            </div>
            <div class="card">
              <h3>Data Pengembalian Buku</h3>
              <p>Melihat status pengembalian buku yang sudah atau belum dikembalikan.</p>
            </div>
          </div>
        </div>
      </main>
    </div>

    <template id="detailModalTemplate">
      <div class="modal-overlay">
        <div class="modal">
          <div class="modal-content">
            <h3>Detail Dokumen</h3>
            <div class="detail-content">
              <!-- Detail content will be dynamically inserted -->
            </div>
            <div class="modal-buttons">
              <button class="modal-button modal-button-secondary">Tutup</button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Loading Indicator Template -->
    <template id="loadingTemplate">
      <div class="loading-overlay">
        <div class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
          <span>Memuat...</span>
        </div>
      </div>
    </template>

    <!-- Error Message Template -->
    <template id="errorTemplate">
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        <span class="error-text"></span>
      </div>
    </template>

    <!-- Scripts -->
    <script src="../../assets/js/perpustakaan/dashboard.js"></script>
    <script src="../../assets/js/perpustakaan/card.js"></script>
  </body>
</html>