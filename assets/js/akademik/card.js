// Data dummy untuk kartu dashboard akademik
const dashboardCards = [
  {
    id: 1,
    title: "Verifikasi Tugas Akhir",
    content: "Verifikasi dokumen tugas akhir mahasiswa yang telah diupload.",
    status: "pending",
    progress: 70,
    date: "2024-03-20",
    action: "Verifikasi",
    image: "../assets/images/akademik/gambar_VerifikasiTA.png",
  },
  {
    id: 2,
    title: "Verifikasi UKT",
    content: "Verifikasi bukti pembayaran UKT mahasiswa semester ini.",
    status: "approved",
    progress: 100,
    date: "2024-03-19",
    action: "Lihat",
    image: "../assets/images/akademik/gambar_VerifikasiUKT.png",
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
          ${
            cardData.status === "rejected"
              ? "Ditolak"
              : cardData.status === "approved"
              ? "Disetujui"
              : cardData.status === "pending"
              ? "Menunggu"
              : cardData.status.charAt(0).toUpperCase() +
                cardData.status.slice(1)
          }
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

// Fungsi format tanggal
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
}

// Fungsi untuk menampilkan modal
function showModal(modalType, data) {
  const existingModal = document.querySelector(".modal-overlay");
  if (existingModal) {
    existingModal.remove();
  }

  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.dataset.cardId = data.id;
  modalOverlay.innerHTML = createModalContent(modalType, data);

  document.body.appendChild(modalOverlay);

  requestAnimationFrame(() => {
    modalOverlay.classList.add("modal-fade-in");
  });

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
    case "verification":
      return `
        <div class="modal">
          <div class="modal-content">
            <h3>Verifikasi ${data.title}</h3>
            <form id="verificationForm">
              <div class="form-group">
                <label for="verificationStatus">Status Verifikasi:</label>
                <select id="verificationStatus" class="form-control" required>
                  <option value="">Pilih Status</option>
                  <option value="approved">Disetujui</option>
                  <option value="rejected">Ditolak</option>
                </select>
              </div>
              <div class="form-group">
                <label for="verificationNotes">Catatan:</label>
                <textarea id="verificationNotes" class="form-control" rows="3" placeholder="Tambahkan catatan jika diperlukan..."></textarea>
              </div>
              <div class="modal-buttons">
                <button type="button" class="modal-button modal-button-secondary" onclick="closeModal(this)">Batal</button>
                <button type="submit" class="modal-button modal-button-primary">Simpan</button>
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
              <p><strong>Status:</strong> ${
                data.status === "approved"
                  ? "Disetujui"
                  : data.status === "rejected"
                  ? "Ditolak"
                  : "Menunggu"
              }</p>
              <p><strong>Progress:</strong> ${data.progress}%</p>
              <p><strong>Tanggal:</strong> ${formatDate(data.date)}</p>
            </div>
            <div class="modal-buttons">
              <button class="modal-button modal-button-secondary" onclick="closeModal(this)">Tutup</button>
            </div>
          </div>
        </div>
      `;
  }
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
  if (action === "verifikasi") {
    showModal("verification", card);
  } else if (action.includes("lihat")) {
    showModal("detail", card);
  }
}

// Fungsi untuk menangani submit form verifikasi
function handleVerificationSubmit(form, cardId) {
  const status = form.querySelector("#verificationStatus").value;
  const notes = form.querySelector("#verificationNotes").value;

  if (!status) {
    showError("Silakan pilih status verifikasi");
    return;
  }

  showLoadingState(form);

  // Simulasi proses verifikasi
  setTimeout(() => {
    hideLoadingState(form);
    closeModal(form.closest(".modal-overlay"));
    showSuccess("Verifikasi berhasil disimpan");
    updateCardStatus(cardId, status);
  }, 1500);
}

// Fungsi untuk menampilkan loading state
function showLoadingState(form) {
  const submitBtn = form.querySelector(".modal-button-primary");
  const allInputs = form.querySelectorAll("input, select, textarea, button");

  allInputs.forEach((input) => (input.disabled = true));
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyimpan...';
}

// Fungsi untuk menyembunyikan loading state
function hideLoadingState(form) {
  const submitBtn = form.querySelector(".modal-button-primary");
  const allInputs = form.querySelectorAll("input, select, textarea, button");

  allInputs.forEach((input) => (input.disabled = false));
  submitBtn.innerHTML = "Simpan";
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
  statusElement.textContent =
    newStatus === "approved"
      ? "Disetujui"
      : newStatus === "rejected"
      ? "Ditolak"
      : "Menunggu";
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

  // Event listener untuk submit form verifikasi
  document.addEventListener("submit", (e) => {
    if (e.target.id === "verificationForm") {
      e.preventDefault();
      const modalOverlay = e.target.closest(".modal-overlay");
      const cardId = parseInt(modalOverlay.dataset.cardId);
      handleVerificationSubmit(e.target, cardId);
    }
  });
});
