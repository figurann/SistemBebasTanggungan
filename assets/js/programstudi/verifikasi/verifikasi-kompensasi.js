document.addEventListener("DOMContentLoaded", function() {
    // Add page transition class
    document.body.classList.add("page-transition");

    // Search and filter functionality
    const searchInput = document.getElementById("searchInput");
    const statusFilter = document.getElementById("statusFilter");
    const semesterFilter = document.getElementById("semesterFilter");
    const dataTable = document.getElementById("dataTable");
    const tableRows = dataTable.getElementsByTagName("tr");

    function filterTable() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusValue = statusFilter.value;
        const semesterValue = semesterFilter.value;

        for (let i = 1; i < tableRows.length; i++) {
            const row = tableRows[i];
            const nim = row.getAttribute("data-nim").toLowerCase();
            const name = row.cells[1].textContent.toLowerCase();
            const semester = row.cells[4].textContent;
            const status = row.getAttribute("data-status");

            const matchesSearch = nim.includes(searchTerm) || name.includes(searchTerm);
            const matchesStatus = statusValue === "all" || status === statusValue;
            const matchesSemester = semesterValue === "all" || semester === semesterValue;

            if (matchesSearch && matchesStatus && matchesSemester) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
    }

    searchInput.addEventListener("input", filterTable);
    statusFilter.addEventListener("change", filterTable);
    semesterFilter.addEventListener("change", filterTable);

    // Modal functionality
    const modal = document.getElementById("previewModal");
    const closeModal = document.getElementsByClassName("close-modal")[0];

    window.openModal = function() {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    };

    window.closeModal = function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    };

    closeModal.onclick = window.closeModal;

    window.onclick = function(event) {
        if (event.target == modal) {
            window.closeModal();
        }
    };

    // Document preview functionality
    window.viewDocument = function(nim) {
        const imagePath = `../../../assets/images/bukti_kompensasi/${nim}.jpg`;
        const previewImage = document.getElementById("previewImage");
        previewImage.src = imagePath;
        openModal();
    };

    // Error handling for images
    document.getElementById("previewImage").onerror = function() {
        this.src = "../../../assets/images/no-image.png";
    };

    // Verification functionality
    window.verifyKompensasi = function(nim, action) {
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
            action === "approve" ? "Kompensasi berhasil diverifikasi!" : "Kompensasi ditolak!",
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
