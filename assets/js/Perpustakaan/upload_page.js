// Contoh data peminjaman yang bisa Anda ambil dari database di backend
const peminjamanData = [
  {
      id: 1,
      nama_mahasiswa: "John Doe",
      nama_buku: "Pemrograman Web",
      tanggal_peminjaman: "2024-12-01",
      tanggal_pengembalian: "2024-12-08",
      status: "Belum Kembali"
  },
  {
      id: 2,
      nama_mahasiswa: "Jane Smith",
      nama_buku: "Algoritma dan Struktur Data",
      tanggal_peminjaman: "2024-12-10",
      tanggal_pengembalian: "2024-12-17",
      status: "Sudah Kembali"
  }
];

// Fungsi untuk menghitung selisih hari antara dua tanggal
function calculateDaysDifference(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Menampilkan data peminjaman ke dalam tabel
function loadTableData() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  peminjamanData.forEach(peminjaman => {
      const daysDifference = calculateDaysDifference(peminjaman.tanggal_peminjaman, new Date());
      const isLate = daysDifference > 7 && peminjaman.status === "Belum Kembali";
      const tanggungan = isLate ? "Mahasiswa terlambat mengembalikan buku!" : "Buku sudah dikembalikan tepat waktu.";

      const row = document.createElement("tr");

      row.innerHTML = `
          <td>${peminjaman.nama_mahasiswa}</td>
          <td>${peminjaman.nama_buku}</td>
          <td>${peminjaman.tanggal_peminjaman}</td>
          <td>${peminjaman.tanggal_pengembalian}</td>
          <td>
              <button class="konfirmasi" data-id="${peminjaman.id}">Konfirmasi</button>
          </td>
          <td class="tanggungan ${isLate ? "" : "ok"}">${tanggungan}</td>
      `;
      tableBody.appendChild(row);
  });
}

// Fungsi untuk mengonfirmasi pengembalian buku
function confirmReturn(id) {
  const peminjaman = peminjamanData.find(p => p.id === id);
  if (peminjaman) {
      peminjaman.status = "Sudah Kembali";
      loadTableData();
  }
}

// Menangani klik tombol konfirmasi
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('konfirmasi')) {
      const id = parseInt(event.target.getAttribute('data-id'));
      confirmReturn(id);
  }
});

// Memuat data peminjaman saat halaman dimuat
window.onload = function() {
  console.log("Halaman dimuat. Memuat data...");
  loadTableData();
};