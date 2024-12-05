// Data dummy untuk kartu dashboard
const dashboardCards = [
  {
    id: 1,
    title: "Laporan Tugas Akhir",
    content: "Upload dokumen Tugas Akhir Anda dan pantau statusnya.",
    status: "pending",
    progress: 70,
    date: "2024-12-03",
    action: "Upload",
    image: "../assets/images/mahasiswa/gambar_LaporanTugasAkhir.png",
  },
  {
    id: 2,
    title: "Biaya UKT",
    content: "Informasi mengenai biaya UKT dan status pembayarannya.",
    status: "approved",
    progress: 100,
    date: "2024-12-01",
    action: "Lihat",
    image: "../assets/images/mahasiswa/gambar_BiayaUKT.png",
  },
  {
    id: 3,
    title: "Surat Bebas Kompensasi",
    content: "Details about your compensation clearance letter status.",
    status: "pending",
    progress: 60,
    date: "2024-12-02",
    action: "Verifikasi",
    image: "../assets/images/mahasiswa/gambar_SuratBebasKompensasi.png",
  },
  {
    id: 4,
    title: "Surat Bebas Peminjaman Buku",
    content: "Periksa status surat bebas peminjaman buku Anda.",
    status: "pending",
    progress: 30,
    date: "2024-12-04",
    action: "Upload",
    image: "../assets/images/mahasiswa/gambar_SuratBebasPeminjamanBuku.png",
  },
];

// Fungsi untuk membuat kartu dashboard
function createDashboardCard(cardData) {
  return `  
      <div class="dashboard-card">  
          <div class="card-icon">  
              <img src="${cardData.image}" alt="${
    cardData.title
  }" class="icon-image" />  
          </div>  
          <h3 class="card-title">${cardData.title}</h3>  
          <div class="card-content">  
              <p>${cardData.content}</p>  
              <div class="progress-container">  
                  <div class="progress-bar">  
                      <div class="progress-fill" style="width: ${
                        cardData.progress
                      }%;"></div>  
                  </div>  
              </div>  
              <span class="card-status status-${cardData.status}">  
                  ${
                    cardData.status.charAt(0).toUpperCase() +
                    cardData.status.slice(1)
                  }  
              </span>  
          </div>  
          <div class="card-footer">  
              <span class="card-date">${formatDate(cardData.date)}</span>  
              <button class="card-action" onclick="handleCardAction(${
                cardData.id
              })">${cardData.action}</button>  
          </div>  
      </div>  
  `;
}

// Fungsi untuk memformat tanggal
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
}

// Fungsi untuk menangani aksi kartu
function handleCardAction(cardId) {
  const card = dashboardCards.find((card) => card.id === cardId);
  if (card) {
    switch (card.action.toLowerCase()) {
      case "upload":
        showUploadModal(card.title);
        break;
      case "lihat":
        showDetailModal(card);
        break;
      case "verifikasi":
        showVerificationModal(card);
        break;
      default:
        console.log(`Action for card ${cardId} not implemented`);
    }
  }
}

// Fungsi untuk menampilkan modal upload
function showUploadModal(title) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `  
      <div class="modal">  
          <div class="modal-content">  
              <h3>Upload Dokumen - ${title}</h3>  
              <form id="uploadForm">  
                  <input type="file" class="file-input" required>  
                  <div class="modal-buttons">  
                      <button type="button" class="modal-button modal-button-secondary" onclick="closeModal(this)">Batal</button>  
                      <button type="submit" class="modal-button modal-button-primary">Upload</button>  
                  </div>  
              </form>  
          </div>  
      </div>  
  `;
  document.body.appendChild(modal);

  // Handle form submission
  modal.querySelector("#uploadForm").addEventListener("submit", (e) => {
    e.preventDefault();
    // Implementasi logika upload file
    closeModal(modal.querySelector("button"));
  });

  setTimeout(() => modal.classList.add("modal-fade-in"), 0);
}

// Fungsi untuk menampilkan modal detail
function showDetailModal(card) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `  
      <div class="modal">  
          <div class="modal-content">  
              <h3>Detail ${card.title}</h3>  
              <div class="detail-content">  
                  <p><strong>Status:</strong> ${card.status}</p>  
                  <p><strong>Progress:</strong> ${card.progress}%</p>  
                  <p><strong>Tanggal:</strong> ${formatDate(card.date)}</p>  
              </div>  
              <div class="modal-buttons">  
                  <button class="modal-button modal-button-secondary" onclick="closeModal(this)">Tutup</button>  
              </div>  
          </div>  
      </div>  
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add("modal-fade-in"), 0);
}

// Fungsi untuk menampilkan modal verifikasi
function showVerificationModal(card) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `  
      <div class="modal">  
          <div class="modal-content">  
              <h3>Verifikasi ${card.title}</h3>  
              <div class="detail-content">  
                  <p>Status verifikasi sedang dalam proses.</p>  
                  <p>Silahkan cek kembali nanti.</p>  
              </div>  
              <div class="modal-buttons">  
                  <button class="modal-button modal-button-secondary" onclick="closeModal(this)">Tutup</button>  
              </div>  
          </div>  
      </div>  
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add("modal-fade-in"), 0);
}

// Fungsi untuk menutup modal
function closeModal(button) {
  const modal = button.closest(".modal-overlay");
  modal.classList.add("modal-fade-out");
  setTimeout(() => {
    document.body.removeChild(modal);
  }, 300);
}

// Inisialisasi kartu dashboard
document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("card-container");
  if (cardContainer) {
    cardContainer.innerHTML = dashboardCards
      .map((card) => createDashboardCard(card))
      .join("");
  }
});
