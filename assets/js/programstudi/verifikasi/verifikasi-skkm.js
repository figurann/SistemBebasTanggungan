// Inisialisasi icons
lucide.createIcons();

// DOM Elements
const modal = document.getElementById("documentModal");
const closeModal = document.querySelector(".close-modal");
const notification = document.getElementById("notification");
const searchInput = document.querySelector(".search-box input");
const filterSelects = document.querySelectorAll(".filter-select");

// Event Listeners
closeModal.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

// Search functionality
searchInput.addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const rows = document.querySelectorAll(".data-table tbody tr");

  rows.forEach((row) => {
    const nim = row.cells[0].textContent.toLowerCase();
    const nama = row.cells[1].textContent.toLowerCase();
    const visible = nim.includes(searchTerm) || nama.includes(searchTerm);
    row.style.display = visible ? "" : "none";
  });
});

// Filter functionality
filterSelects.forEach((select) => {
  select.addEventListener("change", function () {
    applyFilters();
  });
});

function applyFilters() {
  const kategoriFilter = filterSelects[0].value.toLowerCase();
  const statusFilter = filterSelects[1].value.toLowerCase();

  const rows = document.querySelectorAll(".data-table tbody tr");

  rows.forEach((row) => {
    const kategori = row.cells[2].textContent.toLowerCase();
    const status = row.cells[5].textContent.toLowerCase();

    const matchKategori = !kategoriFilter || kategori === kategoriFilter;
    const matchStatus = !statusFilter || status === statusFilter;

    row.style.display = matchKategori && matchStatus ? "" : "none";
  });
}

// View Document
function viewDocument(id) {
  // Simulasi data dokumen
  const dummyDetails = {
    nim: "2141720001",
    nama: "Ahmad Fauzi",
    kategori: "Prestasi",
    kegiatan: "Juara 1 Lomba Programming",
    tanggal: "15/01/2024",
    bukti: "assets/images/sample-certificate.jpg",
  };

  const detailsHTML = `
        <div class="document-details">
            <p><strong>NIM:</strong> ${dummyDetails.nim}</p>
            <p><strong>Nama:</strong> ${dummyDetails.nama}</p>
            <p><strong>Kategori:</strong> ${dummyDetails.kategori}</p>
            <p><strong>Kegiatan:</strong> ${dummyDetails.kegiatan}</p>
            <p><strong>Tanggal:</strong> ${dummyDetails.tanggal}</p>
        </div>
    `;

  document.getElementById("documentDetails").innerHTML = detailsHTML;
  document.getElementById("previewImage").src = dummyDetails.bukti;
  modal.style.display = "block";
}

// Approve SKKM
function approveSKKM(id) {
  // Simulasi API call
  setTimeout(() => {
    showNotification("SKKM berhasil disetujui", "success");
    updateStatus(id, "approved");
  }, 500);
}

// Reject SKKM
function rejectSKKM(id) {
  // Simulasi API call
  setTimeout(() => {
    showNotification("SKKM ditolak", "error");
    updateStatus(id, "rejected");
  }, 500);
}

// Update status in UI
function updateStatus(id, status) {
  const row = document.querySelector(`tr[data-id="${id}"]`);
  if (row) {
    const statusCell = row.querySelector(".status-cell");
    statusCell.className = `status-cell ${status}`;
    statusCell.textContent = status.charAt(0).toUpperCase() + status.slice(1);

    // Hide action buttons
    const actionButtons = row.querySelector(".action-buttons");
    actionButtons.innerHTML = `
            <button class="btn btn-view" onclick="viewDocument(${id})">
                <i data-lucide="file-text"></i>
                View
            </button>
        `;
    lucide.createIcons();
  }
}

// Show notification
function showNotification(message, type) {
  notification.textContent = message;
  notification.className = `notification ${type} show`;

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}
