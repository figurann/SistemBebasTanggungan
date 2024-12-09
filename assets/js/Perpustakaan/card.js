// Data dummy untuk kartu dashboard mahasiswa
const dashboardCards = [
  {
    id: 1,
    title: "Pengembalian Buku",
    content: "Lihat daftar peminjaman mahasiswa.",
    status: "pending",
    progress: 70,
    date: "2024-03-20",
    action: "Lihat Detail",
    image: "../assets/images/perpustakaan/buku.jpeg",
    details: {
      fileName: "",
      uploadDate: "",
      verifiedBy: "",
      notes: "",
    },
  },
  {
    id: 2,
    title: "Status Tanggungan",
    content: "Upload bukti pembayaran UKT semester ini.",
    status: "approved",
    progress: 100,
    date: "2024-03-19",
    action: "Lihat Detail",
    image: "../assets/images/perpustakaan/papanKlip.jpeg",
    details: {
      semester: "Genap 2023/2024",
      amount: "Rp 5.000.000",
      paymentDate: "2024-02-15",
      verifiedBy: "Admin Keuangan",
    },
  },
  {
    id: 3,
    title: "Verifikasi Dokumen",
    content: "Upload dokumen bebas peminjaman buku perpustakaan.",
    status: "pending",
    progress: 45,
    date: "2024-03-18",
    action: "Upload",
    image: "../assets/images/perpustakaan/ceklist.jpeg",
    details: {
      fileName: "",
      uploadDate: "",
      verifiedBy: "",
      notes: "",
    },
  },
];

// Fungsi untuk membuat kartu dashboard
function createDashboardCard(cardData) {
  return `
    <div class="dashboard-card">
      <div class="card-icon">
        <img src="${cardData.image}" alt="${cardData.title}" class="icon-image">
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
          ${formatStatus(cardData.status)}
        </span>
      </div>
      <div class="card-footer">
        <span class="card-date">${formatDate(cardData.date)}</span>
        <button class="card-action" data-card-id="${cardData.id}">${
    cardData.action
  }</button>
      </div>
    </div>
  `;
}

// Fungsi format status
function formatStatus(status) {
  const statusMap = {
    pending: "Menunggu",
    approved: "Disetujui",
    rejected: "Ditolak",
  };
  return statusMap[status] || status;
}

// Fungsi format tanggal
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
}

// Fungsi untuk menampilkan modal
function showModal(modalType, data) {
  const modalContent = createModalContent(modalType, data);
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.dataset.cardId = data.id;
  modalOverlay.innerHTML = modalContent;

  document.body.appendChild(modalOverlay);
  requestAnimationFrame(() => modalOverlay.classList.add("modal-fade-in"));

  // Event listener untuk tombol Escape
  const escapeHandler = (e) => {
    if (e.key === "Escape") {
      closeModal(modalOverlay.querySelector(".modal-button-secondary"));
      document.removeEventListener("keydown", escapeHandler);
    }
  };
  document.addEventListener("keydown", escapeHandler);

  // Event listener untuk klik di luar modal
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal(modalOverlay.querySelector(".modal-button-secondary"));
    }
  });
}

// Fungsi untuk membuat konten modal
function createModalContent(type, data) {
  switch (type) {
    case "upload":
      return `
        <div class="modal">
          <div class="modal-content">
            <h3>Upload Dokumen - ${data.title}</h3>
            <form id="uploadForm" class="upload-form">
              <div class="form-group">
                <label for="documentFile">Pilih File:</label>
                <input type="file" id="documentFile" class="file-input" required />
                <small class="form-text">Format yang diizinkan: PDF, maksimal 5MB</small>
              </div>
              <div class="form-group">
                <label for="description">Keterangan:</label>
                <textarea id="description" class="form-control" rows="3"></textarea>
              </div>
              <div class="modal-buttons">
                <button type="button" class="modal-button modal-button-secondary">Batal</button>
                <button type="submit" class="modal-button modal-button-primary">Upload</button>
              </div>
            </form>
          </div>
        </div>
      `;
    case "detail":
      return `
        <div class="modal">
          <div class="modal-content">
            <h3>Detail ${data.title}</h3>
            <div class="detail-content">
              ${createDetailContent(data)}
            </div>
            <div class="modal-buttons">
              <button class="modal-button modal-button-secondary">Tutup</button>
            </div>
          </div>
        </div>
      `;
    default:
      return "";
  }
}

// Fungsi untuk membuat konten detail
function createDetailContent(data) {
  let content = "";

  if (data.details) {
    for (const [key, value] of Object.entries(data.details)) {
      const formattedKey = key
        .replace(/([A-Z])/g, " $1")
        .toLowerCase()
        .replace(/^./, (str) => str.toUpperCase());
      content += `<p><strong>${formattedKey}:</strong> ${value || "-"}</p>`;
    }
  }

  return content;
}

// Fungsi untuk menutup modal
function closeModal(button) {
  const modal = button.closest(".modal-overlay");
  modal.classList.add("modal-fade-out");
  setTimeout(() => modal.remove(), 300);
}

// Fungsi untuk menangani aksi kartu
function handleCardAction(cardId) {
  const card = dashboardCards.find((card) => card.id === cardId);
  if (!card) return;

  const action = card.action.toLowerCase();
  if (action.includes("upload")) {
    showModal("upload", card);
  } else if (action.includes("detail") || action.includes("status")) {
    showModal("detail", card);
  }
}

// Fungsi untuk menangani submit form
function handleFormSubmission(form, cardId) {
  const file = form.querySelector("#documentFile").files[0];
  const description = form.querySelector("#description").value;

  if (!file) {
    showError("Silakan pilih file terlebih dahulu");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    showError("Ukuran file tidak boleh lebih dari 5MB");
    return;
  }

  showLoadingState(form);

  // Simulasi upload
  setTimeout(() => {
    hideLoadingState(form);
    closeModal(form.closest(".modal-overlay"));
    showSuccess("Dokumen berhasil diupload");
    updateCardStatus(cardId, "pending");
  }, 2000);
}

// Fungsi untuk menampilkan loading state
function showLoadingState(form) {
  const submitBtn = form.querySelector(".modal-button-primary");
  const allInputs = form.querySelectorAll("input, button, textarea");

  allInputs.forEach((input) => (input.disabled = true));
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengupload...';
}

// Fungsi untuk menyembunyikan loading state
function hideLoadingState(form) {
  const submitBtn = form.querySelector(".modal-button-primary");
  const allInputs = form.querySelectorAll("input, button, textarea");

  allInputs.forEach((input) => (input.disabled = false));
  submitBtn.innerHTML = "Upload";
}

// Fungsi untuk menampilkan pesan error
function showError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.innerHTML = `
    <i class="fas fa-exclamation-circle"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(errorDiv);
  setTimeout(() => errorDiv.remove(), 3000);
}

// Fungsi untuk menampilkan pesan sukses
function showSuccess(message) {
  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(successDiv);
  setTimeout(() => successDiv.remove(), 3000);
}

// Fungsi untuk mengupdate status kartu
function updateCardStatus(cardId, newStatus) {
  const card = document
    .querySelector(`[data-card-id="${cardId}"]`)
    .closest(".dashboard-card");
  const statusElement = card.querySelector(".card-status");

  statusElement.className = `card-status status-${newStatus}`;
  statusElement.textContent = formatStatus(newStatus);
}

// Inisialisasi saat dokumen dimuat
document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("card-container");
  if (cardContainer) {
    cardContainer.innerHTML = dashboardCards.map(createDashboardCard).join("");

    // Event listener untuk aksi kartu
    cardContainer.addEventListener("click", (e) => {
      const actionButton = e.target.closest(".card-action");
      if (actionButton) {
        const cardId = parseInt(actionButton.dataset.cardId);
        handleCardAction(cardId);
      }
    });
  }

  // Event listener untuk submit form
  document.addEventListener("submit", (e) => {
    if (e.target.id === "uploadForm") {
      e.preventDefault();
      const modalOverlay = e.target.closest(".modal-overlay");
      const cardId = parseInt(modalOverlay.dataset.cardId);
      handleFormSubmission(e.target, cardId);
    }
  });
});
