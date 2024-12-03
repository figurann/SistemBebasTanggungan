// Data dummy untuk kartu dashboard
const dashboardCards = [
  {
    id: 1,
    title: "Status Tugas Akhir",
    icon: "fa-book",
    iconBg: "#e3f2fd",
    iconColor: "#1976d2",
    content: "Upload dokumen Tugas Akhir",
    status: "pending",
    progress: 30,
    date: "2024-12-03",
    action: "Upload",
  },
  {
    id: 2,
    title: "Pembayaran UKT",
    icon: "fa-money-bill",
    iconBg: "#e8f5e9",
    iconColor: "#2e7d32",
    content: "Semester Genap 2024/2025",
    status: "approved",
    progress: 100,
    date: "2024-12-01",
    action: "Lihat",
  },
  {
    id: 3,
    title: "Bebas Perpustakaan",
    icon: "fa-book-reader",
    iconBg: "#fff3e0",
    iconColor: "#f57c00",
    content: "Verifikasi peminjaman buku",
    status: "pending",
    progress: 60,
    date: "2024-12-02",
    action: "Verifikasi",
  },
  {
    id: 4,
    title: "Pengumpulan Berkas",
    icon: "fa-folder",
    iconBg: "#f3e5f5",
    iconColor: "#7b1fa2",
    content: "Dokumen persyaratan wisuda",
    status: "pending",
    progress: 45,
    date: "2024-12-04",
    action: "Upload",
  },
];

// Fungsi untuk membuat kartu dashboard
function createDashboardCard(cardData) {
  return `
        <div class="dashboard-card">
            <div class="card-header">
                <div class="card-icon" style="background-color: ${
                  cardData.iconBg
                }">
                    <i class="fas ${cardData.icon}" style="color: ${
    cardData.iconColor
  }"></i>
                </div>
                <h3 class="card-title">${cardData.title}</h3>
            </div>
            <div class="card-content">
                <p>${cardData.content}</p>
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${
                          cardData.progress
                        }%; background-color: ${cardData.iconColor}"></div>
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
