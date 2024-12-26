// Data dummy untuk kartu dashboard
const dashboardCards = [
  {
    id: 1,
    title: "Verifikasi Biaya UKT",
    content: "Informasi mengenai biaya UKT dan status pembayarannya.",
    status: "approved",
    action: "Verifikasi",
    image: "../../assets/images/programstudi/verifikasi_bayarukt.png",
  },
  {
    id: 2,
    title: "Verifikasi Surat Bebas Kompensasi",
    content: "Informasi mengenai surat bebas kompensasi.",
    status: "pending",
    action: "Verifikasi",
    image: "../../assets/images/programstudi/verifikasi_dokumen.png",
  },
  {
    id: 3,
    title: "Verifikasi SKKM",
    content: "Informasi mengenai status SKKM Anda.",
    status: "pending",
    action: "Verifikasi",
    image: "../../assets/images/programstudi/verifikasi_skkm.png",
  },
  {
    id: 4,
    title: "Verifikasi TOEIC",
    content: "Informasi mengenai status TOEIC Anda.",
    status: "approved",
    action: "Verifikasi",
    image: "../../assets/images/programstudi/verifikasi_toeic.png",
  },
];

// ========= Dashboard Cards Initialization =========
function initializeDashboardCards() {
  const cardContainer = document.getElementById("card-container");
  if (cardContainer) {
    cardContainer.innerHTML = dashboardCards.map(createDashboardCard).join("");

    // Gunakan event delegation
    cardContainer.addEventListener("click", function (event) {
      const actionButton = event.target.closest(".card-action");
      if (actionButton) {
        event.preventDefault();
        handleCardAction(event);
      }
    });
  }
}

// ========= Card Functions =========
function createDashboardCard(cardData) {
  return `  
    <div class="dashboard-card" data-card-id="${cardData.id}">  
      <div class="card-icon">  
        <img src="${cardData.image}" alt="${cardData.title} Icon" />  
      </div>  
      <h3 class="card-title">${cardData.title}</h3>  
      <div class="card-content">  
        <p>${cardData.content}</p>  
      </div>  
      <div class="card-footer">  
        <button class="card-action" data-card-id="${cardData.id}">  
          ${cardData.action}  
        </button>  
      </div>  
    </div>  
  `;
}

function handleCardAction(event) {
  console.log("Card action clicked", event.target);

  const actionButton = event.target.closest(".card-action");

  if (!actionButton) {
    console.log("No action button found");
    return;
  }

  console.log("Action button found", actionButton);

  const cardId = parseInt(actionButton.dataset.cardId);
  console.log("Card ID:", cardId);

  const card = dashboardCards.find((card) => card.id === cardId);

  if (card) {
    console.log("Card found", card);
    showModal("upload", card);
  } else {
    console.log("No card found for ID:", cardId);
  }
}

// ========= Modal Functions =========
function showModal(type, data) {
  console.log("Showing modal", type, data);

  // Hapus modal yang sudah ada
  const existingModal = document.querySelector(".modal-overlay");
  if (existingModal) {
    existingModal.remove();
  }

  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.innerHTML = createModalContent(type, data);

  document.body.appendChild(modalOverlay);

  // Tambahkan class untuk menampilkan modal
  modalOverlay.style.display = "flex";
  modalOverlay.style.opacity = "1";

  // Tambahkan event listener untuk menutup modal
  const closeButtons = modalOverlay.querySelectorAll(
    ".modal-close, .modal-button-secondary"
  );
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => closeModal(modalOverlay));
  });

  // Tutup modal saat klik di luar
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal(modalOverlay);
    }
  });

  // Tambahkan event listener untuk tombol escape
  const escapeHandler = (e) => {
    if (e.key === "Escape") {
      closeModal(modalOverlay);
      document.removeEventListener("keydown", escapeHandler);
    }
  };
  document.addEventListener("keydown", escapeHandler);
}

function createModalContent(type, data) {
  return `  
    <div class="modal">  
      <div class="modal-content">  
        <div class="modal-header">  
          <h3>Upload Dokumen - ${data.title}</h3>  
          <button class="modal-close">&times;</button>  
        </div>  
        <form id="uploadForm" data-card-id="${data.id}">  
          <div class="file-upload-container">  
            <input type="file" id="fileUpload" class="file-input" required>  
            <label for="fileUpload" class="file-upload-label">  
              <i class="fas fa-cloud-upload-alt"></i>  
              <span>Pilih File untuk Diupload</span>  
            </label>  
          </div>  
          <div class="modal-buttons">  
            <button type="button" class="modal-button modal-button-secondary">Batal</button>  
            <button type="submit" class="modal-button modal-button-primary">Upload</button>  
          </div>  
        </form>  
      </div>  
    </div>  
  `;
}

function closeModal(modalOverlay) {
  modalOverlay.style.opacity = "0";
  modalOverlay.style.display = "none";
  modalOverlay.remove();
}

// ========= Form Submission Handler =========
function initializeFormSubmission() {
  document.addEventListener("submit", (e) => {
    if (e.target.id === "uploadForm") {
      e.preventDefault();
      handleFormSubmission(e.target);
    }
  });
}

function handleFormSubmission(form) {
  const file = form.querySelector(".file-input").files[0];
  const cardId = form.dataset.cardId;

  if (!file) {
    showError("Silakan pilih file");
    return;
  }

  showLoadingState(form);

  // Simulasi upload
  setTimeout(() => {
    hideLoadingState(form);
    closeModal(form.closest(".modal-overlay"));
    showSuccess("File berhasil diupload");
  }, 2000);
}

function showLoadingState(form) {
  const submitBtn = form.querySelector(".modal-button-primary");
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengunggah...';
}

function hideLoadingState(form) {
  const submitBtn = form.querySelector(".modal-button-primary");
  submitBtn.disabled = false;
  submitBtn.innerHTML = "Upload";
}

// ========= Utility Functions =========
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

// ========= Initialization =========
document.addEventListener("DOMContentLoaded", initializeDashboardCards);
initializeFormSubmission();
