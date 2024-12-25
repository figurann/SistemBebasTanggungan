// Data dummy untuk kartu dashboard
const dashboardCards = [
  {
    id: 1,
    title: "Laporan Program Studi",
    content: "Upload dokumen program studi Anda dan pantau statusnya.",
    status: "pending",
    progress: 50,
    date: "2024-12-05",
    action: "Upload",
  },
  {
    id: 2,
    title: "Keuangan Program Studi",
    content: "Informasi status keuangan program studi Anda.",
    status: "approved",
    progress: 100,
    date: "2024-12-06",
    action: "Lihat",
  },
  {
    id: 3,
    title: "Surat Bebas Pinjaman",
    content: "Periksa status surat bebas pinjaman Anda.",
    status: "pending",
    progress: 30,
    date: "2024-12-07",
    action: "Verifikasi",
  },
];

// Fungsi utama untuk membuat kartu dashboard
function createDashboardCard(cardData) {
  return `
          <div class="dashboard-card">
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

// Initialize
const cardContainer = document.getElementById("card-container");
if (cardContainer) {
  cardContainer.innerHTML = dashboardCards.map(createDashboardCard).join("");
}
