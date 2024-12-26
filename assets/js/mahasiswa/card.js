// Data dummy untuk kartu dashboard
const dashboardCards = [
  {
    id: 1,
    title: "Laporan Tugas Akhir",
    content: "Upload dokumen Tugas Akhir Anda dan pantau statusnya.",
    status: "rejected",
    progress: 70,
    date: "2024-12-03",
    action: "Upload Ulang",
    image: "../../assets/images/mahasiswa/gambar_LaporanTugasAkhir.png",
  },
  {
    id: 2,
    title: "Biaya UKT",
    content: "Informasi mengenai biaya UKT dan status pembayarannya.",
    status: "approved",
    progress: 100,
    date: "2024-12-01",
    action: "Upload",
    image: "../../assets/images/mahasiswa/gambar_BiayaUKT.png",
  },
  {
    id: 3,
    title: "Surat Bebas Kompensasi",
    content: "Details about your compensation clearance letter status.",
    status: "pending",
    progress: 60,
    date: "2024-12-02",
    action: "Verifikasi",
    image: "../../assets/images/mahasiswa/gambar_SuratBebasKompensasi.png",
  },
  {
    id: 4,
    title: "Surat Bebas Peminjaman Buku",
    content: "Periksa status surat bebas peminjaman buku Anda.",
    status: "pending",
    progress: 30,
    date: "2024-12-04",
    action: "Upload",
    image: "../../assets/images/mahasiswa/gambar_SuratBebasPeminjamanBuku.png",
  },
  {
    id: 5,
    title: "SKKM",
    content: "ini perolehan SKKM kamu!",
    status: "pending",
    progress: 30,
    date: "2024-12-04",
    action: "Lihat",
    image: "../../assets/images/mahasiswa/gambar_SuratBebasPeminjamanBuku.png",
  },
  {
    id: 6,
    title: "TOEIC",
    content: "ini hasil TOEIC kamu!",
    status: "pending",
    progress: 30,
    date: "2024-12-04",
    action: "Lihat",
    image: "../../assets/images/mahasiswa/gambar_SuratBebasPeminjamanBuku.png",
  },
];

// Fungsi utama untuk membuat kartu dashboard
function createDashboardCard(cardData) {
  return `
      <div class="dashboard-card">
          <div class="card-icon">
              <img src="${cardData.image}" alt="${
    cardData.title
  }" class="icon-image">
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

// Utility functions
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
}

// Modal handling functions
function showModal(modalType, data) {
  const modalContent = createModalContent(modalType, data);
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.innerHTML = modalContent;
  document.body.appendChild(modalOverlay);
  setTimeout(() => modalOverlay.classList.add("modal-fade-in"), 0);
}

function createModalContent(type, data) {
  switch (type) {
    case "upload":
      if (data.title == 'Biaya UKT') { 
        return `
          <div class="modal">
            <div class="modal-content">
              <h3>Upload Dokumen - ${data.title}</h3>
              <form action="upload.php" method="post" enctype="multipart/form-data">
                <input type="file" name="fileToUpload" id="fileToUpload">
                <input type="hidden" name="jenisDokumen" value="${data.title}">
                <div class="modal-buttons">
                  <button type="button" class="modal-button modal-button-secondary" onclick="closeModal(this)">Batal</button>
                  <input type="submit" value="Upload File" name="submit" class="modal-button modal-button-primary">
                </div>
              </form>
            </div>
          </div>
        `;
      } else if (data.title == 'Laporan Tugas Akhir') { 
        return `
          <div class="modal">
            <div class="modal-content">
              <h3>Upload Dokumen - ${data.title}</h3>
              <form action="upload.php" method="post" enctype="multipart/form-data">
                <input type="file" name="fileToUpload" id="fileToUpload">
                <input type="hidden" name="jenisDokumen" value="${data.title}">
                <div class="modal-buttons">
                  <button type="button" class="modal-button modal-button-secondary" onclick="closeModal(this)">Batal</button>
                  <input type="submit" value="Upload File" name="submit" class="modal-button modal-button-primary">
                </div>
              </form>
            </div>
          </div>
        `;
      } else if (data.title == 'Surat Bebas Peminjaman Buku') { 
        return `
          <div class="modal">
            <div class="modal-content">
              <h3>Upload Dokumen - ${data.title}</h3>
              <form action="upload.php" method="post" enctype="multipart/form-data">
                <input type="file" name="fileToUpload" id="fileToUpload">
                <input type="hidden" name="jenisDokumen" value="${data.title}">
                <div class="modal-buttons">
                  <button type="button" class="modal-button modal-button-secondary" onclick="closeModal(this)">Batal</button>
                  <input type="submit" value="Upload File" name="submit" class="modal-button modal-button-primary">
                </div>
              </form>
            </div>
          </div>
        `;
      }
      break;

    case "detail":
      return `
        <div class="modal">
          <div class="modal-content">
            <h3>Detail ${data.title}</h3>
            <div class="detail-content">
              <p><strong>Status:</strong> ${data.status}</p>
              <p><strong>Progress:</strong> ${data.progress}%</p>
              <p><strong>Tanggal:</strong> ${formatDate(data.date)}</p>
            </div>
            <div class="modal-buttons">
              <button class="modal-button modal-button-secondary" onclick="closeModal(this)">Tutup</button>
            </div>
          </div>
        </div>
      `;

    case "verification":
      return `
        <div class="modal">
          <div class="modal-content">
            <h3>Verifikasi ${data.title}</h3>
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
  }
}

function closeModal(button) {
  const modal = button.closest(".modal-overlay");
  modal.classList.add("modal-fade-out");
  setTimeout(() => modal.remove(), 300);
}

// Event handlers
function handleCardAction(cardId) {
  const card = dashboardCards.find((card) => card.id === cardId);
  if (!card) return;

  const action = card.action.toLowerCase();
  if (action.includes("upload")) {
    showModal("upload", card);
  } else if (action === "lihat") {
    showModal("detail", card);
  } else if (action === "verifikasi") {
    showModal("verification", card);
  }
}

// Form handling
function handleFormSubmission(form, cardId) {
  const file = form.querySelector(".file-input").files[0];
  if (!file) {
    alert("Please select a file");
    return;
  }

  showLoadingState(form);
  // Simulate upload process
  setTimeout(() => {
    hideLoadingState(form);
    closeModal(form.closest(".modal-overlay"));
    // Update card status if needed
  }, 2000);
}

function showLoadingState(form) {
  const submitBtn = form.querySelector(".modal-button-primary");
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
}

function hideLoadingState(form) {
  const submitBtn = form.querySelector(".modal-button-primary");
  submitBtn.disabled = false;
  submitBtn.innerHTML = "Upload";
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("card-container");
  if (cardContainer) {
    cardContainer.innerHTML = dashboardCards.map(createDashboardCard).join("");

    // Add event listeners for card actions
    cardContainer.addEventListener("click", (e) => {
      const actionButton = e.target.closest(".card-action");
      if (actionButton) {
        const cardId = parseInt(actionButton.dataset.cardId);
        handleCardAction(cardId);
      }
    });
  }

  // Global event listener for form submissions
  document.addEventListener("submit", (e) => {
    if (e.target.id === "uploadForm") {
      e.preventDefault();
      const modalOverlay = e.target.closest(".modal-overlay");
      const cardId = modalOverlay.dataset.cardId;
      handleFormSubmission(e.target, cardId);
    }
  });

  // Global event listener for modal close buttons
  document.addEventListener("click", (e) => {
    if (e.target.matches(".modal-button-secondary")) {
      closeModal(e.target);
    }
  });
});

// Improved modal handling
function showModal(modalType, data) {
  // Remove any existing modals
  const existingModal = document.querySelector(".modal-overlay");
  if (existingModal) {
    existingModal.remove();
  }

  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.dataset.cardId = data.id;
  modalOverlay.innerHTML = createModalContent(modalType, data);

  document.body.appendChild(modalOverlay);

  // Add fade-in effect
  requestAnimationFrame(() => {
    modalOverlay.classList.add("modal-fade-in");
  });

  // Add escape key listener
  const escapeHandler = (e) => {
    if (e.key === "Escape") {
      closeModal(modalOverlay.querySelector(".modal-button-secondary"));
      document.removeEventListener("keydown", escapeHandler);
    }
  };
  document.addEventListener("keydown", escapeHandler);

  // Add click outside listener
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal(modalOverlay.querySelector(".modal-button-secondary"));
    }
  });
}

// Improved loading state handling
function showLoadingState(form) {
  const submitBtn = form.querySelector(".modal-button-primary");
  const allInputs = form.querySelectorAll("input, button");

  allInputs.forEach((input) => (input.disabled = true));
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
}

function hideLoadingState(form) {
  const submitBtn = form.querySelector(".modal-button-primary");
  const allInputs = form.querySelectorAll("input, button");

  allInputs.forEach((input) => (input.disabled = false));
  submitBtn.innerHTML = "Upload";
}

// Improved form submission handling
function handleFormSubmission(form, cardId) {
  const file = form.querySelector(".file-input").files[0];

  if (!file) {
    showError("Please select a file");
    return;
  }

  showLoadingState(form);

  // Simulate upload process
  setTimeout(() => {
    hideLoadingState(form);
    closeModal(form.closest(".modal-overlay"));
    showSuccess("File uploaded successfully");

    // Update card status if needed
    updateCardStatus(cardId, "pending");
  }, 2000);
}

// Add these helper functions
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

function updateCardStatus(cardId, newStatus) {
  const card = document
    .querySelector(`[data-card-id="${cardId}"]`)
    .closest(".dashboard-card");
  const statusElement = card.querySelector(".card-status");

  statusElement.className = `card-status status-${newStatus}`;
  statusElement.textContent =
    newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
}
