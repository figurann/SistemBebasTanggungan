// Simulasi data detail kartu
const cardDetails = {
  id: 1,
  title: "Data Mahasiswa Peminjam",
  content: "Lihat daftar peminjaman mahasiswa.",
  status: "pending",
  progress: 70,
  date: "2024-03-20",
  details: {
    studentName: "Budi Santoso",
    borrowDate: "2024-03-18",
    bookName: "Pemrograman Web Lanjut"
  }
};

// Fungsi untuk memuat detail kartu ke halaman
function loadCardDetails() {
  const cardDetailElement = document.getElementById("card-detail");

  let detailHtml = `
    <h2>${cardDetails.title}</h2>
    <p>${cardDetails.content}</p>
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${cardDetails.progress}%;"></div>
      </div>
    </div>
    <span class="card-status status-${cardDetails.status}">
      ${formatStatus(cardDetails.status)}
    </span>
    <div class="detail-info">
      <p><strong>Nama Mahasiswa:</strong> ${cardDetails.details.studentName}</p>
      <p><strong>Tanggal Peminjaman:</strong> ${formatDate(cardDetails.details.borrowDate)}</p>
      <p><strong>Nama Buku:</strong> ${cardDetails.details.bookName}</p>
    </div>
  `;

  cardDetailElement.innerHTML = detailHtml;
}

// Panggil fungsi untuk memuat detail kartu saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadCardDetails);

// Fungsi format status
function formatStatus(status) {
  const statusMap = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
  };
  return statusMap[status] || status;
}

// Fungsi format tanggal
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
}

// Fungsi untuk kembali ke halaman sebelumnya
function goBack() {
  window.history.back();
}
