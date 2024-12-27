document.addEventListener("DOMContentLoaded", function () {
  // Add page transition class
  document.body.classList.add("page-transition");

  // Search and filter functionality
  const searchInput = document.getElementById("searchInput");
  const statusFilter = document.getElementById("statusFilter");
  const skorFilter = document.getElementById("skorFilter");
  const dataTable = document.getElementById("dataTable");
  const tableRows = dataTable.getElementsByTagName("tr");

  function filterTable() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;
    const skorValue = skorFilter.value;

    for (let i = 1; i < tableRows.length; i++) {
      const row = tableRows[i];
      const nim = row.getAttribute("data-nim").toLowerCase();
      const name = row.cells[1].textContent.toLowerCase();
      const status = row.getAttribute("data-status");
      const skor = parseInt(row.getAttribute("data-skor"));

      const matchesSearch =
        nim.includes(searchTerm) || name.includes(searchTerm);
      const matchesStatus = statusValue === "all" || status === statusValue;

      let matchesSkor = true;
      if (skorValue !== "all") {
        switch (skorValue) {
          case "high":
            matchesSkor = skor >= 700;
            break;
          case "medium":
            matchesSkor = skor >= 500 && skor < 700;
            break;
          case "low":
            matchesSkor = skor < 500;
            break;
        }
      }

      if (matchesSearch && matchesStatus && matchesSkor) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }
  }

  searchInput.addEventListener("input", filterTable);
  statusFilter.addEventListener("change", filterTable);
  skorFilter.addEventListener("change", filterTable);

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
    const pdfPath = `../../../assets/documents/toeic/${nim}.pdf`;
    const previewFrame = document.getElementById("previewFrame");
    previewFrame.src = pdfPath;
    openModal();
  };

  // Verification functionality
  window.verifyTOEIC = function (nim, action) {
    const row = document.querySelector(`tr[data-nim="${nim}"]`);
    const statusCell = row.querySelector(".status-cell");
    const actionButtons = row.querySelector("td:last-child");
    const skor = parseInt(row.getAttribute("data-skor"));

    // Check if score meets minimum requirement (example: 450)
    if (action === "approve" && skor < 450) {
      showNotification(
        "Skor TOEIC tidak memenuhi syarat minimum (450)",
        "error"
      );
      return;
    }

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
      action === "approve"
        ? "Sertifikat TOEIC berhasil diverifikasi!"
        : "Sertifikat TOEIC ditolak!",
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

  // Highlight high scores
  function highlightScores() {
    const skorCells = document.querySelectorAll("td[data-skor]");
    skorCells.forEach((cell) => {
      const skor = parseInt(cell.textContent);
      if (skor >= 700) {
        cell.classList.add("score-highlight");
      }
    });
  }

  highlightScores();
});
