document.addEventListener("DOMContentLoaded", function () {
  // Add page transition class
  document.body.classList.add("page-transition");

  // Search and filter functionality
  const searchInput = document.getElementById("searchInput");
  const statusFilter = document.getElementById("statusFilter");
  const kegiatanFilter = document.getElementById("kegiatanFilter");
  const dataTable = document.getElementById("dataTable");
  const tableRows = dataTable.getElementsByTagName("tr");

  function filterTable() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;
    const kegiatanValue = kegiatanFilter.value;

    for (let i = 1; i < tableRows.length; i++) {
      const row = tableRows[i];
      const nim = row.getAttribute("data-nim").toLowerCase();
      const name = row.cells[1].textContent.toLowerCase();
      const kegiatan = row.getAttribute("data-kegiatan");
      const status = row.getAttribute("data-status");

      const matchesSearch =
        nim.includes(searchTerm) || name.includes(searchTerm);
      const matchesStatus = statusValue === "all" || status === statusValue;
      const matchesKegiatan =
        kegiatanValue === "all" || kegiatan === kegiatanValue;

      if (matchesSearch && matchesStatus && matchesKegiatan) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }
  }

  searchInput.addEventListener("input", filterTable);
  statusFilter.addEventListener("change", filterTable);
  kegiatanFilter.addEventListener("change", filterTable);

  // Modal functionality
  const modal = document.getElementById("previewModal");
  const closeModal = document.getElementsByClassName("close-modal")[0];

  window.openModal = function () {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  };

  window.closeModal = function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };

  closeModal.onclick = window.closeModal;

  window.onclick = function (event) {
    if (event.target == modal) {
      window.closeModal();
    }
  };

  // Document preview functionality
  window.viewDocument = function (nim) {
    const pdfPath = `../../../assets/documents/skkm/${nim}.pdf`;
    const previewFrame = document.getElementById("previewFrame");
    previewFrame.src = pdfPath;
    openModal();
  };

  // Verification functionality
  window.verifySKKM = function (nim, action) {
    const row = document.querySelector(`tr[data-nim="${nim}"]`);
    const statusCell = row.querySelector(".status-cell");
    const actionButtons = row.querySelector("td:last-child");

    if (action === "approve") {
      statusCell.textContent = "Disetujui";
      statusCell.className = "status-cell approved";
    } else {
      statusCell.textContent = "Ditolak";
      statusCell.className = "status-cell rejected";
    }

    // Remove action buttons after verification
    actionButtons.innerHTML = "";

    // Show notification
    showNotification(
      action === "approve" ? "SKKM berhasil diverifikasi!" : "SKKM ditolak!",
      action === "approve" ? "success" : "error"
    );
  };

  // Notification function
  function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
});
